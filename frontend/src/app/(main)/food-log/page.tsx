'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { foodApi } from '@/lib/api'
import { MEAL_LABELS, formatKcal, formatGram } from '@/lib/utils'
import { Plus, Search, Trash2 } from 'lucide-react'
import dayjs from 'dayjs'

export default function FoodLogPage() {
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'))
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [selectedMeal, setSelectedMeal] = useState('BREAKFAST')
  const qc = useQueryClient()

  const { data: logs = [] } = useQuery({
    queryKey: ['food-logs', date],
    queryFn: () => foodApi.getLogs(date),
  })

  const { data: summary } = useQuery({
    queryKey: ['food-summary', date],
    queryFn: () => foodApi.getSummary(date),
  })

  const { data: searchResults = [], isFetching: searching } = useQuery({
    queryKey: ['food-search', searchQuery],
    queryFn: () => foodApi.search(searchQuery),
    enabled: searchQuery.length >= 1,
  })

  const addLog = useMutation({
    mutationFn: ({ foodItemId, mealType }: any) =>
      foodApi.createLog({
        foodItemId,
        loggedAt: new Date(`${date}T12:00:00`).toISOString(),
        mealType,
        servingCount: 1,
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['food-logs', date] })
      qc.invalidateQueries({ queryKey: ['food-summary', date] })
      qc.invalidateQueries({ queryKey: ['dashboard'] })
      setShowSearch(false)
      setSearchQuery('')
    },
  })

  const deleteLog = useMutation({
    mutationFn: (id: string) => foodApi.deleteLog(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['food-logs', date] })
      qc.invalidateQueries({ queryKey: ['food-summary', date] })
    },
  })

  const s = summary as any
  const logList = logs as any[]
  const mealGroups = ['BREAKFAST', 'LUNCH', 'DINNER', 'SNACK'].map((meal) => ({
    meal,
    items: logList.filter((l) => l.mealType === meal),
  }))

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">식단 기록</h1>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 text-sm text-gray-500 border-0 bg-transparent cursor-pointer"
          />
        </div>
        <button
          className="btn-primary flex items-center gap-2"
          onClick={() => setShowSearch(true)}
        >
          <Plus size={16} /> 음식 추가
        </button>
      </div>

      {s && (
        <div className="card mb-6">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-xs text-gray-400">총 칼로리</p>
              <p className="text-xl font-bold text-blue-600">{Math.round(s.totalCalories)}</p>
              <p className="text-xs text-gray-400">kcal</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">단백질</p>
              <p className="text-xl font-bold text-blue-500">{Math.round(s.totalProtein)}</p>
              <p className="text-xs text-gray-400">g</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">탄수화물</p>
              <p className="text-xl font-bold text-amber-500">{Math.round(s.totalCarb)}</p>
              <p className="text-xs text-gray-400">g</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">지방</p>
              <p className="text-xl font-bold text-pink-500">{Math.round(s.totalFat)}</p>
              <p className="text-xs text-gray-400">g</p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-5">
        {mealGroups.map(({ meal, items }) => (
          <div key={meal} className="card">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-gray-700">{MEAL_LABELS[meal]}</h3>
              <button
                className="text-blue-500 text-sm hover:underline flex items-center gap-1"
                onClick={() => { setSelectedMeal(meal); setShowSearch(true) }}
              >
                <Plus size={14} /> 추가
              </button>
            </div>
            {items.length === 0 ? (
              <p className="text-sm text-gray-400 py-2">아직 기록이 없습니다</p>
            ) : (
              <div className="space-y-2">
                {items.map((item: any) => (
                  <div key={item.id} className="flex justify-between items-center py-2 border-t border-gray-50">
                    <div>
                      <p className="text-sm font-medium">{item.foodItem?.name}</p>
                      <p className="text-xs text-gray-400">
                        {item.servingCount}인분 · {Math.round(item.caloriesConsumed)} kcal ·
                        P:{Math.round(item.proteinConsumed)}g C:{Math.round(item.carbConsumed)}g F:{Math.round(item.fatConsumed)}g
                      </p>
                    </div>
                    <button
                      onClick={() => deleteLog.mutate(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {showSearch && (
        <div className="fixed inset-0 bg-black/50 flex items-end md:items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md max-h-[80vh] flex flex-col">
            <div className="p-5 border-b border-gray-100">
              <h3 className="font-bold mb-3">음식 검색</h3>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  autoFocus
                  className="input pl-9"
                  placeholder="음식 이름을 입력하세요"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2 mt-3">
                {['BREAKFAST', 'LUNCH', 'DINNER', 'SNACK'].map((m) => (
                  <button
                    key={m}
                    onClick={() => setSelectedMeal(m)}
                    className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                      selectedMeal === m ? 'bg-blue-500 text-white border-blue-500' : 'border-gray-200 text-gray-500'
                    }`}
                  >
                    {MEAL_LABELS[m]}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-y-auto flex-1 p-3">
              {searching && <p className="text-center text-gray-400 py-4">검색 중...</p>}
              {(searchResults as any[]).map((food: any) => (
                <button
                  key={food.id}
                  className="w-full text-left p-3 hover:bg-gray-50 rounded-xl transition-colors"
                  onClick={() => addLog.mutate({ foodItemId: food.id, mealType: selectedMeal })}
                >
                  <p className="font-medium text-sm">{food.name}</p>
                  <p className="text-xs text-gray-400">
                    {food.brand ? `${food.brand} · ` : ''}{food.servingSizeG}g 당 {Math.round(food.caloriesPerServing)} kcal
                  </p>
                </button>
              ))}
              {searchQuery && !searching && (searchResults as any[]).length === 0 && (
                <p className="text-center text-gray-400 py-8">검색 결과가 없습니다</p>
              )}
            </div>

            <div className="p-4 border-t border-gray-100">
              <button className="btn-secondary w-full" onClick={() => { setShowSearch(false); setSearchQuery('') }}>
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
