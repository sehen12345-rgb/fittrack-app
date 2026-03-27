'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { metricsApi } from '@/lib/api'
import { useForm } from 'react-hook-form'
import { Plus, Trash2 } from 'lucide-react'
import dayjs from 'dayjs'

export default function BodyMetricsPage() {
  const [showForm, setShowForm] = useState(false)
  const qc = useQueryClient()
  const { register, handleSubmit, reset } = useForm()

  const { data: metrics = [] } = useQuery({
    queryKey: ['body-metrics'],
    queryFn: () => metricsApi.getAll(),
  })

  const createMetrics = useMutation({
    mutationFn: (data: any) => metricsApi.create({
      ...data,
      weightKg: Number(data.weightKg),
      bodyFatPercent: data.bodyFatPercent ? Number(data.bodyFatPercent) : undefined,
      muscleMassKg: data.muscleMassKg ? Number(data.muscleMassKg) : undefined,
      waistCm: data.waistCm ? Number(data.waistCm) : undefined,
    }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['body-metrics'] })
      qc.invalidateQueries({ queryKey: ['dashboard'] })
      qc.invalidateQueries({ queryKey: ['weight-trend'] })
      setShowForm(false)
      reset()
    },
  })

  const deleteMetrics = useMutation({
    mutationFn: (id: string) => metricsApi.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['body-metrics'] }),
  })

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">체중 · 신체 측정</h1>
        <button className="btn-primary flex items-center gap-2" onClick={() => setShowForm(true)}>
          <Plus size={16} /> 측정값 입력
        </button>
      </div>

      <div className="space-y-3">
        {(metrics as any[]).length === 0 && (
          <div className="card text-center py-12 text-gray-400">
            <p className="text-4xl mb-3">⚖️</p>
            <p>아직 측정 기록이 없습니다</p>
          </div>
        )}
        {[...(metrics as any[])].reverse().map((m: any) => (
          <div key={m.id} className="card">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">{dayjs(m.recordedAt).format('YYYY년 M월 D일')}</p>
                <p className="text-2xl font-bold mt-1">{m.weightKg} kg</p>
                <div className="flex gap-4 mt-2 text-sm text-gray-500">
                  {m.bodyFatPercent && <span>체지방 {m.bodyFatPercent}%</span>}
                  {m.muscleMassKg && <span>근육량 {m.muscleMassKg}kg</span>}
                  {m.waistCm && <span>허리 {m.waistCm}cm</span>}
                </div>
                {m.note && <p className="text-sm text-gray-400 mt-1">{m.note}</p>}
              </div>
              <button onClick={() => deleteMetrics.mutate(m.id)} className="text-gray-400 hover:text-red-500">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <h3 className="font-bold text-xl mb-5">측정값 입력</h3>
            <form onSubmit={handleSubmit((d) => createMetrics.mutate(d))} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label">측정일</label>
                  <input
                    type="date"
                    className="input"
                    defaultValue={dayjs().format('YYYY-MM-DD')}
                    {...register('recordedAt', { required: true })}
                  />
                </div>
                <div>
                  <label className="label">체중 (kg) *</label>
                  <input type="number" step="0.1" className="input" placeholder="75.0" {...register('weightKg', { required: true })} />
                </div>
                <div>
                  <label className="label">체지방률 (%)</label>
                  <input type="number" step="0.1" className="input" placeholder="20.0" {...register('bodyFatPercent')} />
                </div>
                <div>
                  <label className="label">근육량 (kg)</label>
                  <input type="number" step="0.1" className="input" placeholder="30.0" {...register('muscleMassKg')} />
                </div>
                <div>
                  <label className="label">허리 (cm)</label>
                  <input type="number" step="0.1" className="input" placeholder="80" {...register('waistCm')} />
                </div>
              </div>
              <div>
                <label className="label">메모</label>
                <input className="input" placeholder="인바디 측정 등..." {...register('note')} />
              </div>
              <div className="flex gap-3">
                <button type="button" className="btn-secondary flex-1" onClick={() => setShowForm(false)}>취소</button>
                <button type="submit" className="btn-primary flex-1" disabled={createMetrics.isPending}>
                  {createMetrics.isPending ? '저장 중...' : '저장'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
