"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { mockAlerts } from "@/lib/mock-data"
import { ShieldAlert, Search } from "lucide-react"
import { formatUTCDate } from "@/lib/utils"

const criticalTypes = [
  "Brute Force Attempt",
  "Malicious Hash Detected",
  "Firewall Disabled",
  "Unauthorized Driver",
  "After Hours Login",
  "Suspicious Port",
]

const severityColors: Record<string, string> = {
  critical: "bg-[#ef4444]/15 text-[#ef4444] border-[#ef4444]/30",
  high: "bg-[#f59e0b]/15 text-[#f59e0b] border-[#f59e0b]/30",
  medium: "bg-[#3b82f6]/15 text-primary border-[#3b82f6]/30",
  low: "bg-[#64748b]/15 text-[#94a3b8] border-[#64748b]/30",
}

export default function CriticalAlertsPage() {
  const criticalAlerts = mockAlerts.filter(
    (a) => a.severity === "critical" || a.severity === "high" || criticalTypes.some((t) => a.type.includes(t))
  )

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-lg bg-[#ef4444]/15">
          <ShieldAlert className="size-5 text-[#ef4444]" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">Critical Alerts</h2>
          <p className="text-sm text-muted-foreground">
            High priority security events requiring immediate attention
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {criticalTypes.map((type) => {
          const count = criticalAlerts.filter((a) => a.type.includes(type)).length
          return (
            <Card key={type} className="border-border bg-card">
              <CardContent className="flex flex-col items-center gap-1 pt-6 text-center">
                <span className="text-2xl font-bold text-foreground">{count}</span>
                <span className="text-xs text-muted-foreground">{type}</span>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <ScrollArea className="h-[600px]">
        <div className="flex flex-col gap-3 pr-4">
          {criticalAlerts.map((alert) => (
            <Card key={alert.id} className="border-border bg-card">
              <CardContent className="pt-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <Badge className={severityColors[alert.severity] + " hover:bg-transparent"}>
                        {alert.severity}
                      </Badge>
                      <span className="text-sm font-semibold text-foreground">{alert.type}</span>
                    </div>
                    <span className="text-xs font-medium text-primary">{alert.device}</span>
                    <p className="text-xs text-muted-foreground leading-relaxed">{alert.description}</p>
                    <span className="text-xs text-muted-foreground">
                      {formatUTCDate(alert.timestamp)}
                    </span>
                  </div>
                  <Button variant="outline" size="sm" className="w-fit shrink-0 border-border text-xs">
                    <Search className="mr-1.5 size-3" />
                    Investigate
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
