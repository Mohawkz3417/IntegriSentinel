"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useDevices, useAlerts, useLoginActivity, useUSBDevices, useFileChanges } from "@/lib/hooks/use-data"
import { useMemo } from "react"
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
  Loader2,
} from "lucide-react"

export function KPICards() {
  // Fetch all data using SWR hooks (auto-updates from Flask backend)
  const { data: devices = [], isLoading: devicesLoading } = useDevices()
  const { data: alerts = [], isLoading: alertsLoading } = useAlerts()
  const { data: loginActivity = [], isLoading: loginsLoading } = useLoginActivity()
  const { data: usbDevices = [], isLoading: usbLoading } = useUSBDevices()
  const { data: fileChanges = [], isLoading: filesLoading } = useFileChanges()

  const isLoading = devicesLoading || alertsLoading || loginsLoading || usbLoading || filesLoading

  // Calculate KPI values from live data
  const kpiData = useMemo(() => {
    const totalDevices = devices.length
    const onlineDevices = devices.filter((d) => d.online).length
    const offlineDevices = devices.filter((d) => !d.online).length
    const criticalAlerts = alerts.filter((a) => a.severity === "critical" && a.status !== "resolved").length
    const highRiskDevices = devices.filter((d) => d.riskLevel >= 70).length
    const failedLogins = loginActivity.filter((l) => !l.success).length
    const usbCount = usbDevices.length
    const fileCount = fileChanges.length

    return [
      { label: "Total Devices", value: String(totalDevices), icon: Monitor, trend: "+2", up: true, color: "#3b82f6" },
      { label: "Active Devices", value: String(onlineDevices), icon: Wifi, trend: "+1", up: true, color: "#10b981" },
      { label: "Offline Devices", value: String(offlineDevices), icon: WifiOff, trend: "-1", up: false, color: "#64748b" },
      { label: "Critical Alerts", value: String(criticalAlerts), icon: ShieldAlert, trend: `+${criticalAlerts}`, up: criticalAlerts > 0, color: "#ef4444" },
      { label: "High Risk Devices", value: String(highRiskDevices), icon: AlertTriangle, trend: `+${highRiskDevices}`, up: highRiskDevices > 0, color: "#f59e0b" },
      { label: "Failed Logins Today", value: String(failedLogins), icon: LogIn, trend: `+${failedLogins}`, up: failedLogins > 0, color: "#ef4444" },
      { label: "USB Insertions Today", value: String(usbCount), icon: Usb, trend: `+${usbCount}`, up: true, color: "#06b6d4" },
      { label: "Modified Files Today", value: String(fileCount), icon: FileWarning, trend: `+${fileCount}`, up: true, color: "#f59e0b" },
    ]
  }, [devices, alerts, loginActivity, usbDevices, fileChanges])

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i} className="border-border bg-card animate-pulse">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="h-4 w-24 bg-muted rounded" />
              <div className="size-8 bg-muted rounded-lg" />
            </CardHeader>
            <CardContent>
              <div className="h-8 w-16 bg-muted rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

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
