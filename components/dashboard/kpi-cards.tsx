"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Monitor,
  Wifi,
  WifiOff,
  AlertTriangle,
  ShieldAlert,
  LogIn,
  Usb,
  FileWarning,
  TrendingUp,
  TrendingDown,
} from "lucide-react"

const kpiData = [
  { label: "Total Devices", value: "12", icon: Monitor, trend: "+2", up: true, color: "#3b82f6" },
  { label: "Active Devices", value: "10", icon: Wifi, trend: "+1", up: true, color: "#10b981" },
  { label: "Offline Devices", value: "2", icon: WifiOff, trend: "-1", up: false, color: "#64748b" },
  { label: "Critical Alerts", value: "3", icon: ShieldAlert, trend: "+2", up: true, color: "#ef4444" },
  { label: "High Risk Devices", value: "2", icon: AlertTriangle, trend: "+1", up: true, color: "#f59e0b" },
  { label: "Failed Logins Today", value: "18", icon: LogIn, trend: "+12", up: true, color: "#ef4444" },
  { label: "USB Insertions Today", value: "5", icon: Usb, trend: "+2", up: true, color: "#06b6d4" },
  { label: "Modified Files Today", value: "25", icon: FileWarning, trend: "+8", up: true, color: "#f59e0b" },
]

export function KPICards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {kpiData.map((kpi) => (
        <Card
          key={kpi.label}
          className="group border-border dark:border-cyan-500/20 bg-card dark:bg-gradient-to-br dark:from-slate-900/50 dark:to-slate-800/30 hover:border-primary dark:hover:border-cyan-500/40 hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-cyan-500/20 transition-all duration-200 cursor-pointer overflow-hidden relative"
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
            <CardTitle className="text-xs font-medium text-muted-foreground group-hover:text-primary dark:group-hover:text-cyan-300 transition-colors duration-200">
              {kpi.label}
            </CardTitle>
            <div
              className="flex size-8 items-center justify-center rounded-lg border transition-all duration-200"
              style={{
                backgroundColor: `${kpi.color}15`,
                borderColor: `${kpi.color}30`,
              }}
            >
              <kpi.icon className="size-4" style={{ color: kpi.color }} />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="flex items-end gap-2">
              <span className="text-2xl font-bold text-foreground group-hover:text-primary dark:group-hover:text-cyan-300 transition-colors duration-200">{kpi.value}</span>
              <span
                className="flex items-center gap-0.5 text-xs font-medium transition-colors duration-200"
                style={{ color: kpi.label.includes("Offline") || kpi.label.includes("Critical") || kpi.label.includes("Failed") || kpi.label.includes("High Risk")
                  ? kpi.up ? "#ef4444" : "#10b981"
                  : kpi.up ? "#10b981" : "#ef4444"
                }}
              >
                {kpi.up ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
                {kpi.trend}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
