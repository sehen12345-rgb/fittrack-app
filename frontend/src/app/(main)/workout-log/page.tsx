'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { workoutApi } from '@/lib/api'
import { Plus, Trash2, Search, ChevronDown, ChevronUp } from 'lucide-react'
import dayjs from 'dayjs'

export default function WorkoutLogPage() {
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'))
  const [showAdd, setShowAdd] = useState(false)
  const [templateSearch, setTemplateSearch] = useState('')
  const [selectedSets, setSelectedSets] = useState<any[]>([])
  const [note, setNote] = useState('')
  const [expandedLog, setExpandedLog] = useState<string | null>(null)
  const qc = useQueryClient()

  const { data: logs = [] } = useQuery({
    queryKey: ['workout-logs', date],
    queryFn: () => workoutApi.getLogs(date),
  })

  const { data: templates = [] } = useQuery({
    queryKey: ['templates', templateSearch],
    queryFn: () => workoutApi.getTemplates(templateSearch),
    enabled: showAdd,
  })

  const createLog = useMutation({
    mutationFn: () =>
      workoutApi.createLog({
        workoutDate: date,
        note,
        sets: selectedSets,
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['workout-logs', date] })
      qc.invalidateQueries({ queryKey: ['dashboard'] })
      setShowAdd(false)
      setSelectedSets([])
      setNote('')
    },
  })

  const deleteLog = useMutation({
    mutationFn: (id: string) => workoutApi.deleteLog(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['workout-logs', date] }),
  })

  const addSet = (template: any) => {
    setSelectedSets((prev) => [
      ...prev,
      {
        workoutTemplateId: template.id,
        templateName: template.name,
        setNumber: prev.filter((s) => s.workoutTemplateId === template.id).length + 1,
        reps: 10,
        weightKg: 0,
      },
    ])
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">운동 기록</h1>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 text-sm text-gray-500 border-0 bg-transparent cursor-pointer"
          />
        </div>
        <button className="btn-primary flex items-center gap-2" onClick={() => setShowAdd(true)}>
          <Plus size={16} /> 운동 추가
        </button>
      </div>

      <div className="space-y-4">
        {(logs as any[]).length === 0 && (
          <div className="card text-center py-12 text-gray-400">
            <p className="text-4xl mb-3">🏋️</p>
            <p>오늘의 운동을 기록해보세요</p>
          </div>
        )}
        {(logs as any[]).map((log: any) => (
          <div key={log.id} className="card">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold">운동 세션</p>
                <p className="text-sm text-gray-400">
                  {log.totalDurationMin ? `${log.totalDurationMin}분 ·` : ''} {log.sets?.length ?? 0}세트
                </p>
                {log.note && <p className="text-sm text-gray-500 mt-1">{log.note}</p>}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setExpandedLog(expandedLog === log.id ? null : log.id)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  {expandedLog === log.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                <button onClick={() => deleteLog.mutate(log.id)} className="text-gray-400 hover:text-red-500">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {expandedLog === log.id && log.sets?.length > 0 && (
              <div className="mt-4 space-y-2 border-t border-gray-50 pt-3">
                {log.sets.map((set: any) => (
                  <div key={set.id} className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{set.workoutTemplate?.name}</span>
                    <span className="text-gray-400">
                      Set {set.setNumber} · {set.reps}회 {set.weightKg > 0 ? `× ${set.weightKg}kg` : ''}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {showAdd && (
        <div className="fixed inset-0 bg-black/50 flex items-end md:items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] flex flex-col">
            <div className="p-5 border-b border-gray-100">
              <h3 className="font-bold text-lg mb-1">운동 기록 추가</h3>
              <p className="text-sm text-gray-400">{date}</p>
            </div>

            <div className="p-5 border-b border-gray-100">
              <h4 className="text-sm font-semibold text-gray-600 mb-3">운동 검색</h4>
              <div className="relative mb-3">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  className="input pl-9"
                  placeholder="운동 이름 검색..."
                  value={templateSearch}
                  onChange={(e) => setTemplateSearch(e.target.value)}
                />
              </div>
              <div className="max-h-40 overflow-y-auto space-y-1">
                {(templates as any[]).slice(0, 20).map((t: any) => (
                  <button
                    key={t.id}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 text-sm transition-colors"
                    onClick={() => addSet(t)}
                  >
                    <span className="font-medium">{t.name}</span>
                    <span className="text-gray-400 ml-2">{t.category}</span>
                  </button>
                ))}
              </div>
            </div>

            {selectedSets.length > 0 && (
              <div className="p-5 border-b border-gray-100 overflow-y-auto flex-1">
                <h4 className="text-sm font-semibold text-gray-600 mb-3">선택한 세트 ({selectedSets.length})</h4>
                {selectedSets.map((set, idx) => (
                  <div key={idx} className="flex items-center gap-2 mb-2 text-sm">
                    <span className="flex-1 text-gray-700">{set.templateName} Set{set.setNumber}</span>
                    <input
                      type="number"
                      className="w-16 input py-1.5 text-center text-sm"
                      value={set.reps}
                      onChange={(e) => {
                        const s = [...selectedSets]
                        s[idx] = { ...s[idx], reps: Number(e.target.value) }
                        setSelectedSets(s)
                      }}
                      placeholder="횟수"
                    />
                    <span className="text-gray-400 text-xs">회</span>
                    <input
                      type="number"
                      step="0.5"
                      className="w-16 input py-1.5 text-center text-sm"
                      value={set.weightKg}
                      onChange={(e) => {
                        const s = [...selectedSets]
                        s[idx] = { ...s[idx], weightKg: Number(e.target.value) }
                        setSelectedSets(s)
                      }}
                      placeholder="중량"
                    />
                    <span className="text-gray-400 text-xs">kg</span>
                    <button onClick={() => setSelectedSets(selectedSets.filter((_, i) => i !== idx))} className="text-red-400">
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="p-5 space-y-3">
              <input
                className="input"
                placeholder="메모 (선택)"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
              <div className="flex gap-3">
                <button className="btn-secondary flex-1" onClick={() => { setShowAdd(false); setSelectedSets([]) }}>
                  취소
                </button>
                <button
                  className="btn-primary flex-1"
                  onClick={() => createLog.mutate()}
                  disabled={createLog.isPending}
                >
                  {createLog.isPending ? '저장 중...' : '저장'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
