"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { useAlerts } from "@/lib/hooks/use-data"
import { Search, Loader2, AlertTriangle } from "lucide-react"
import { formatUTCDate } from "@/lib/utils"

const severityColors: Record<string, string> = {
  critical: "bg-[#ef4444]/15 text-[#ef4444] border-[#ef4444]/30",
  high: "bg-[#f59e0b]/15 text-[#f59e0b] border-[#f59e0b]/30",
  medium: "bg-[#3b82f6]/15 text-[#3b82f6] border-[#3b82f6]/30",
  low: "bg-[#64748b]/15 text-[#94a3b8] border-[#64748b]/30",
}

export function AlertFeed() {
  const { data: alerts = [], isLoading, error } = useAlerts()

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-foreground">Real-Time Alert Feed</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-[400px]">
            <Loader2 className="size-6 animate-spin text-primary mb-2" />
            <p className="text-sm text-muted-foreground">Loading alerts...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-[400px]">
            <AlertTriangle className="size-6 text-destructive mb-2" />
            <p className="text-sm text-destructive">Failed to load alerts</p>
          </div>
        ) : alerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[400px]">
            <p className="text-sm text-muted-foreground">No alerts to display</p>
          </div>
        ) : (
        <ScrollArea className="h-[400px]">
          <div className="flex flex-col gap-3 pr-4">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="flex flex-col gap-2 rounded-lg border border-border bg-secondary p-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-muted-foreground">
                    {formatUTCDate(alert.timestamp)}
                  </span>
                  <Badge className={severityColors[alert.severity] + " hover:bg-transparent"}>
                    {alert.severity}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-[#3b82f6]">{alert.device}</span>
                  <span className="text-xs text-muted-foreground">-</span>
                  <span className="text-xs font-medium text-foreground">{alert.type}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{alert.description}</p>
                <Button variant="outline" size="sm" className="w-fit border-border text-xs">
                  <Search className="mr-1.5 size-3" />
                  Investigate
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
        )}
      </CardContent>
    </Card>
  )
}
