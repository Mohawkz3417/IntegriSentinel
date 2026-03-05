"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, ShieldCheck, AlertTriangle, MonitorX, HardDrive } from "lucide-react"

const healthData = [
  { label: "Firewall Enabled", value: "10/12", icon: Shield, color: "#10b981" },
  { label: "Antivirus Active", value: "9/12", icon: ShieldCheck, color: "#3b82f6" },
  { label: "Outdated OS", value: "3", icon: MonitorX, color: "#f59e0b" },
  { label: "Suspicious Ports", value: "4", icon: AlertTriangle, color: "#ef4444" },
  { label: "Driver Changes", value: "2", icon: HardDrive, color: "#06b6d4" },
]

export function SystemHealthCards() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {healthData.map((item) => (
        <Card key={item.label} className="border-border bg-[#111827]">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">{item.label}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div
                className="flex size-10 items-center justify-center rounded-lg"
                style={{ backgroundColor: `${item.color}15` }}
              >
                <item.icon className="size-5" style={{ color: item.color }} />
              </div>
              <span className="text-xl font-bold text-foreground">{item.value}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
