'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"
import { mockDeviceHealthData } from "@/lib/mock-data"

const chartTooltipStyle = {
  contentStyle: {
    backgroundColor: "#0f172a",
    border: "1px solid #1a2540",
    borderRadius: "8px",
    color: "#e2e8f0",
    fontSize: "12px",
    boxShadow: "0 0 12px rgba(0, 212, 255, 0.1)",
  },
}

export function DeviceHealthChart() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Card className="border-border dark:border-cyan-500/20 bg-card dark:bg-gradient-to-br dark:from-slate-900/50 dark:to-slate-800/30 overflow-hidden lg:col-span-2 animate-slide-up" style={{ animationDelay: "200ms" }}>
        <CardHeader className="border-b border-border dark:border-cyan-500/10 pb-3">
          <CardTitle className="text-sm font-medium text-foreground dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-cyan-400 dark:to-emerald-400">Device Health Distribution</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-center">
            <div className="h-[250px] w-[250px] bg-secondary dark:bg-slate-900/30 rounded-lg animate-pulse" />
            <div className="flex flex-col gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-8 w-40 bg-secondary dark:bg-slate-900/30 rounded animate-pulse" />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-border dark:border-cyan-500/20 bg-card dark:bg-gradient-to-br dark:from-slate-900/50 dark:to-slate-800/30 overflow-hidden group hover:border-primary dark:hover:border-cyan-500/40 hover:shadow-lg dark:hover:shadow-cyan-500/10 transition-all lg:col-span-2 animate-slide-up" style={{ animationDelay: "200ms" }}>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 dark:from-cyan-500/0 dark:via-cyan-500/5 dark:to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
      <CardHeader className="border-b border-border dark:border-cyan-500/10 pb-3 relative z-10">
        <CardTitle className="text-sm font-medium text-foreground dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-cyan-400 dark:to-emerald-400">Device Health Distribution</CardTitle>
      </CardHeader>
      <CardContent className="pt-6 relative z-10">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-center">
          <div className="h-[250px] w-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart width={250} height={250}>
                <Pie
                  data={mockDeviceHealthData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {mockDeviceHealthData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} opacity={0.8} />
                  ))}
                </Pie>
                <Tooltip {...chartTooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-col gap-3">
            {mockDeviceHealthData.map((entry) => (
              <div key={entry.name} className="flex items-center gap-3 p-2 rounded-lg border border-border dark:border-cyan-500/10 bg-secondary dark:bg-slate-900/30 hover:bg-muted dark:hover:bg-slate-900/60 transition-colors">
                <div className="size-3 rounded-full" style={{ backgroundColor: entry.fill }} />
                <span className="text-sm text-muted-foreground">{entry.name}</span>
                <span className="font-semibold text-primary dark:text-cyan-300">{entry.value}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
