"use client"

import { KPICards } from "@/components/dashboard/kpi-cards"
import { SystemHealthCards } from "@/components/dashboard/system-health-cards"
import { RiskGauge } from "@/components/dashboard/risk-gauge"
import { DashboardCharts } from "@/components/dashboard/dashboard-charts"
import { AlertFeed } from "@/components/dashboard/alert-feed"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-bold text-foreground">Dashboard Overview</h2>
        <p className="text-sm text-muted-foreground">
          Monitor your institution infrastructure in real-time
        </p>
      </div>

      {/* KPI Cards */}
      <KPICards />

      {/* System Health Overview */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          System Health
        </h3>
        <SystemHealthCards />
      </div>

      {/* Risk Gauge + Alert Feed */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <RiskGauge score={58} />
        <div className="lg:col-span-2">
          <AlertFeed />
        </div>
      </div>

      {/* Charts */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Analytics
        </h3>
        <DashboardCharts />
      </div>
    </div>
  )
}
