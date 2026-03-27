'use client'

import { RadialBarChart, RadialBar, ResponsiveContainer, Legend, Tooltip } from 'recharts'

interface Props {
  protein: number
  carb: number
  fat: number
  proteinTarget: number
  carbTarget: number
  fatTarget: number
}

export default function MacroRingChart({ protein, carb, fat, proteinTarget, carbTarget, fatTarget }: Props) {
  const data = [
    { name: '단백질', value: Math.min(100, Math.round((protein / proteinTarget) * 100)), fill: '#3b82f6' },
    { name: '탄수화물', value: Math.min(100, Math.round((carb / carbTarget) * 100)), fill: '#f59e0b' },
    { name: '지방', value: Math.min(100, Math.round((fat / fatTarget) * 100)), fill: '#ec4899' },
  ]

  return (
    <ResponsiveContainer width="100%" height={220}>
      <RadialBarChart
        cx="50%"
        cy="50%"
        innerRadius="30%"
        outerRadius="90%"
        data={data}
        startAngle={90}
        endAngle={-270}
      >
        <RadialBar
          dataKey="value"
          cornerRadius={4}
          background={{ fill: '#f3f4f6' }}
        />
        <Legend iconSize={10} layout="horizontal" verticalAlign="bottom" />
        <Tooltip formatter={(v: number) => `${v}%`} />
      </RadialBarChart>
    </ResponsiveContainer>
  )
}
