"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useAlerts } from "@/lib/hooks/use-data"
import { Search, Loader2, AlertTriangle, CheckCircle2, XCircle, Shield, Monitor, Clock, User, FileText, Lightbulb } from "lucide-react"
import { formatUTCDate } from "@/lib/utils"

const severityColors: Record<string, string> = {
  critical: "bg-[#ef4444]/15 text-[#ef4444] border-[#ef4444]/30",
  high: "bg-[#f59e0b]/15 text-[#f59e0b] border-[#f59e0b]/30",
  medium: "bg-[#3b82f6]/15 text-[#3b82f6] border-[#3b82f6]/30",
  low: "bg-[#64748b]/15 text-[#94a3b8] border-[#64748b]/30",
}

const severityBorderColors: Record<string, string> = {
  critical: "border-l-[#ef4444]",
  high: "border-l-[#f59e0b]",
  medium: "border-l-[#3b82f6]",
  low: "border-l-[#64748b]",
}

type Alert = {
  id: string
  timestamp: string
  device: string
  type: string
  severity: string
  description: string
  status: string
  [key: string]: unknown
}

export function AlertFeed() {
  const { data: alerts = [], isLoading, error } = useAlerts()
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null)
  const [acknowledgedAlerts, setAcknowledgedAlerts] = useState<Set<string>>(new Set())
  const [ignoredAlerts, setIgnoredAlerts] = useState<Set<string>>(new Set())

  const handleAcknowledge = (alertId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setAcknowledgedAlerts(prev => new Set(prev).add(alertId))
    setIgnoredAlerts(prev => {
      const next = new Set(prev)
      next.delete(alertId)
      return next
    })
  }

  const handleIgnore = (alertId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setIgnoredAlerts(prev => new Set(prev).add(alertId))
    setAcknowledgedAlerts(prev => {
      const next = new Set(prev)
      next.delete(alertId)
      return next
    })
  }

  const visibleAlerts = alerts.filter(a => !ignoredAlerts.has(a.id))

  return (
    <>
      <Card className="border-border bg-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium text-foreground">Real-Time Alert Feed</CardTitle>
          {ignoredAlerts.size > 0 && (
            <Badge variant="secondary" className="text-xs">
              {ignoredAlerts.size} ignored
            </Badge>
          )}
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
          ) : visibleAlerts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[400px]">
              <CheckCircle2 className="size-8 text-emerald-500 mb-2" />
              <p className="text-sm text-muted-foreground">No active alerts</p>
            </div>
          ) : (
          <ScrollArea className="h-[400px]">
            <div className="flex flex-col gap-3 pr-4">
              {visibleAlerts.slice(0, 10).map((alert) => {
                const isAcknowledged = acknowledgedAlerts.has(alert.id)
                return (
                  <div
                    key={alert.id}
                    className={`flex flex-col gap-2 rounded-lg border border-l-4 ${severityBorderColors[alert.severity]} border-border bg-secondary p-3 transition-all ${isAcknowledged ? 'opacity-60' : ''}`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          {formatUTCDate(alert.timestamp)}
                        </span>
                        {isAcknowledged && (
                          <Badge variant="outline" className="text-[10px] py-0 px-1.5 text-emerald-500 border-emerald-500/30">
                            Acknowledged
                          </Badge>
                        )}
                      </div>
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
                    <div className="flex items-center gap-2 pt-1">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-border text-xs"
                        onClick={() => setSelectedAlert(alert)}
                      >
                        <Search className="mr-1.5 size-3" />
                        Investigate
                      </Button>
                      {!isAcknowledged && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-emerald-500/30 text-emerald-500 hover:bg-emerald-500/10 text-xs"
                          onClick={(e) => handleAcknowledge(alert.id, e)}
                        >
                          <CheckCircle2 className="mr-1.5 size-3" />
                          Acknowledge
                        </Button>
                      )}
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-muted-foreground hover:text-foreground text-xs"
                        onClick={(e) => handleIgnore(alert.id, e)}
                      >
                        <XCircle className="mr-1.5 size-3" />
                        Ignore
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </ScrollArea>
          )}
        </CardContent>
      </Card>

      {/* Investigation Modal */}
      <Dialog open={!!selectedAlert} onOpenChange={() => setSelectedAlert(null)}>
        <DialogContent className="max-w-2xl border-border bg-card">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-foreground">
              <Shield className="size-5 text-primary" />
              Alert Investigation
            </DialogTitle>
            <DialogDescription>
              Detailed information about this security alert
            </DialogDescription>
          </DialogHeader>
          
          {selectedAlert && (
            <div className="space-y-4">
              {/* Alert Header */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-secondary border border-border">
                <div className="flex items-center gap-3">
                  <Badge className={severityColors[selectedAlert.severity] + " hover:bg-transparent text-sm px-3 py-1"}>
                    {selectedAlert.severity.toUpperCase()}
                  </Badge>
                  <span className="font-semibold text-foreground">{selectedAlert.type}</span>
                </div>
                <span className="text-xs text-muted-foreground">{selectedAlert.id}</span>
              </div>

              {/* Alert Details Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50 border border-border">
                  <Monitor className="size-4 text-primary mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Device</p>
                    <p className="text-sm font-medium text-foreground">{selectedAlert.device}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50 border border-border">
                  <Clock className="size-4 text-primary mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Timestamp</p>
                    <p className="text-sm font-medium text-foreground">{formatUTCDate(selectedAlert.timestamp)}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="p-3 rounded-lg bg-secondary/50 border border-border">
                <div className="flex items-start gap-3">
                  <FileText className="size-4 text-primary mt-0.5" />
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground mb-1">Description</p>
                    <p className="text-sm text-foreground leading-relaxed">{selectedAlert.description}</p>
                  </div>
                </div>
              </div>

              {/* Additional Details */}
              <div className="p-3 rounded-lg bg-secondary/50 border border-border">
                <p className="text-xs text-muted-foreground mb-2 flex items-center gap-2">
                  <User className="size-3" />
                  Additional Details
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {selectedAlert.sourceIP && (
                    <div className="flex justify-between p-2 rounded bg-background">
                      <span className="text-muted-foreground">Source IP:</span>
                      <span className="font-mono text-red-400">{String(selectedAlert.sourceIP)}</span>
                    </div>
                  )}
                  {selectedAlert.targetUser && (
                    <div className="flex justify-between p-2 rounded bg-background">
                      <span className="text-muted-foreground">Target User:</span>
                      <span className="font-medium text-foreground">{String(selectedAlert.targetUser)}</span>
                    </div>
                  )}
                  {selectedAlert.user && (
                    <div className="flex justify-between p-2 rounded bg-background">
                      <span className="text-muted-foreground">User:</span>
                      <span className="font-medium text-foreground">{String(selectedAlert.user)}</span>
                    </div>
                  )}
                  {selectedAlert.failedAttempts && (
                    <div className="flex justify-between p-2 rounded bg-background">
                      <span className="text-muted-foreground">Failed Attempts:</span>
                      <span className="font-medium text-red-400">{String(selectedAlert.failedAttempts)}</span>
                    </div>
                  )}
                  {selectedAlert.filePath && (
                    <div className="flex justify-between p-2 rounded bg-background col-span-2">
                      <span className="text-muted-foreground">File Path:</span>
                      <span className="font-mono text-foreground truncate max-w-[300px]">{String(selectedAlert.filePath)}</span>
                    </div>
                  )}
                  {selectedAlert.hash && (
                    <div className="flex justify-between p-2 rounded bg-background col-span-2">
                      <span className="text-muted-foreground">Hash ({selectedAlert.hashType}):</span>
                      <span className="font-mono text-foreground truncate max-w-[250px]">{String(selectedAlert.hash)}</span>
                    </div>
                  )}
                  {selectedAlert.port && (
                    <div className="flex justify-between p-2 rounded bg-background">
                      <span className="text-muted-foreground">Port:</span>
                      <span className="font-mono text-orange-400">{String(selectedAlert.port)}</span>
                    </div>
                  )}
                  {selectedAlert.dataSize && (
                    <div className="flex justify-between p-2 rounded bg-background">
                      <span className="text-muted-foreground">Data Size:</span>
                      <span className="font-medium text-red-400">{String(selectedAlert.dataSize)}</span>
                    </div>
                  )}
                  {selectedAlert.cpuUsage && (
                    <div className="flex justify-between p-2 rounded bg-background">
                      <span className="text-muted-foreground">CPU Usage:</span>
                      <span className="font-medium text-red-400">{String(selectedAlert.cpuUsage)}</span>
                    </div>
                  )}
                  {selectedAlert.processName && (
                    <div className="flex justify-between p-2 rounded bg-background">
                      <span className="text-muted-foreground">Process:</span>
                      <span className="font-mono text-foreground">{String(selectedAlert.processName)}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Recommendation */}
              {selectedAlert.recommendation && (
                <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="size-4 text-primary mt-0.5" />
                    <div>
                      <p className="text-xs text-primary mb-1 font-medium">Recommended Action</p>
                      <p className="text-sm text-foreground">{String(selectedAlert.recommendation)}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <Button 
                  className="flex-1"
                  onClick={() => {
                    handleAcknowledge(selectedAlert.id, { stopPropagation: () => {} } as React.MouseEvent)
                    setSelectedAlert(null)
                  }}
                >
                  <CheckCircle2 className="mr-2 size-4" />
                  Acknowledge & Close
                </Button>
                <Button variant="outline" onClick={() => setSelectedAlert(null)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
