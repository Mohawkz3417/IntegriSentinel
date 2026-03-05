"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function getRiskLevel(score: number) {
  if (score <= 25) return { label: "Low", color: "#10b981" }
  if (score <= 50) return { label: "Medium", color: "#f59e0b" }
  if (score <= 75) return { label: "High", color: "#ef4444" }
  return { label: "Critical", color: "#dc2626" }
}

export function RiskGauge({ score = 58 }: { score?: number }) {
  const risk = getRiskLevel(score)
  const rotation = (score / 100) * 180 - 90

  return (
    <Card className="border-border bg-[#111827]">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-foreground">Institution Risk Score</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="relative size-48">
          <svg viewBox="0 0 200 120" className="w-full">
            {/* Background arc */}
            <path
              d="M 20 100 A 80 80 0 0 1 180 100"
              fill="none"
              stroke="#1e293b"
              strokeWidth="16"
              strokeLinecap="round"
            />
            {/* Low segment */}
            <path
              d="M 20 100 A 80 80 0 0 1 60 32"
              fill="none"
              stroke="#10b981"
              strokeWidth="16"
              strokeLinecap="round"
              opacity="0.3"
            />
            {/* Medium segment */}
            <path
              d="M 60 32 A 80 80 0 0 1 140 32"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="16"
              opacity="0.3"
            />
            {/* High segment */}
            <path
              d="M 140 32 A 80 80 0 0 1 180 100"
              fill="none"
              stroke="#ef4444"
              strokeWidth="16"
              strokeLinecap="round"
              opacity="0.3"
            />
            {/* Needle */}
            <line
              x1="100"
              y1="100"
              x2="100"
              y2="30"
              stroke={risk.color}
              strokeWidth="3"
              strokeLinecap="round"
              transform={`rotate(${rotation}, 100, 100)`}
            />
            <circle cx="100" cy="100" r="6" fill={risk.color} />
            <circle cx="100" cy="100" r="3" fill="#111827" />
          </svg>
        </div>
        <div className="mt-2 flex flex-col items-center gap-1">
          <span className="text-3xl font-bold" style={{ color: risk.color }}>{score}</span>
          <span className="text-xs font-medium uppercase tracking-wider" style={{ color: risk.color }}>
            {risk.label} Risk
          </span>
        </div>
        <div className="mt-4 flex w-full justify-between text-xs text-muted-foreground">
          <span>0</span>
          <span>25</span>
          <span>50</span>
          <span>75</span>
          <span>100</span>
        </div>
      </CardContent>
    </Card>
  )
}
