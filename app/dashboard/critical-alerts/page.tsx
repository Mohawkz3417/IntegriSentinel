"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
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
import { 
  ShieldAlert, 
  Search, 
  CheckCircle2, 
  XCircle, 
  Shield, 
  Monitor, 
  Clock, 
  User, 
  FileText, 
  Lightbulb,
  Loader2,
  AlertTriangle,
  Eye,
  EyeOff
} from "lucide-react"
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

export default function CriticalAlertsPage() {
  const { data: alerts = [], isLoading, error } = useAlerts()
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null)
  const [acknowledgedAlerts, setAcknowledgedAlerts] = useState<Set<string>>(new Set())
  const [ignoredAlerts, setIgnoredAlerts] = useState<Set<string>>(new Set())
  const [showIgnored, setShowIgnored] = useState(false)

  const criticalAlerts = alerts.filter(
    (a) => a.severity === "critical" || a.severity === "high" || criticalTypes.some((t) => a.type.includes(t))
  )

  const visibleAlerts = showIgnored 
    ? criticalAlerts 
    : criticalAlerts.filter(a => !ignoredAlerts.has(a.id))

  const handleAcknowledge = (alertId: string, e?: React.MouseEvent) => {
    e?.stopPropagation()
    setAcknowledgedAlerts(prev => new Set(prev).add(alertId))
    setIgnoredAlerts(prev => {
      const next = new Set(prev)
      next.delete(alertId)
      return next
    })
  }

  const handleIgnore = (alertId: string, e?: React.MouseEvent) => {
    e?.stopPropagation()
    setIgnoredAlerts(prev => new Set(prev).add(alertId))
    setAcknowledgedAlerts(prev => {
      const next = new Set(prev)
      next.delete(alertId)
      return next
    })
  }

  const handleRestore = (alertId: string, e?: React.MouseEvent) => {
    e?.stopPropagation()
    setIgnoredAlerts(prev => {
      const next = new Set(prev)
      next.delete(alertId)
      return next
    })
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-[#ef4444]/15">
            <ShieldAlert className="size-5 text-[#ef4444]" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">Critical Alerts</h2>
            <p className="text-sm text-muted-foreground">Loading security events...</p>
          </div>
        </div>
        <div className="flex items-center justify-center h-[400px]">
          <Loader2 className="size-8 animate-spin text-primary" />
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-[#ef4444]/15">
            <ShieldAlert className="size-5 text-[#ef4444]" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">Critical Alerts</h2>
            <p className="text-sm text-muted-foreground">High priority security events requiring immediate attention</p>
          </div>
        </div>
        <Card className="border-destructive/50 bg-destructive/10">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <AlertTriangle className="size-12 text-destructive mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Failed to Load Alerts</h3>
            <p className="text-sm text-muted-foreground text-center max-w-md mb-4">
              Unable to fetch critical alerts from the server. This could be due to a network issue or the Flask backend is not running.
            </p>
            <p className="text-xs text-muted-foreground font-mono bg-secondary px-3 py-1 rounded">
              Set NEXT_PUBLIC_FLASK_API_URL to connect to your backend
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
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
        <div className="flex items-center gap-2">
          {ignoredAlerts.size > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowIgnored(!showIgnored)}
              className="gap-2"
            >
              {showIgnored ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              {showIgnored ? "Hide" : "Show"} {ignoredAlerts.size} Ignored
            </Button>
          )}
          {acknowledgedAlerts.size > 0 && (
            <Badge variant="secondary" className="text-xs py-1 px-2">
              <CheckCircle2 className="size-3 mr-1" />
              {acknowledgedAlerts.size} Acknowledged
            </Badge>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {criticalTypes.map((type) => {
          const count = criticalAlerts.filter((a) => a.type.includes(type)).length
          return (
            <Card key={type} className="border-border bg-card hover:border-primary/50 transition-colors">
              <CardContent className="flex flex-col items-center gap-1 pt-6 text-center">
                <span className="text-2xl font-bold text-foreground">{count}</span>
                <span className="text-xs text-muted-foreground">{type}</span>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {visibleAlerts.length === 0 ? (
        <Card className="border-border bg-card">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <CheckCircle2 className="size-12 text-emerald-500 mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">All Clear</h3>
            <p className="text-sm text-muted-foreground text-center">
              {ignoredAlerts.size > 0 
                ? "All remaining alerts have been addressed or ignored."
                : "No critical alerts at this time."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <ScrollArea className="h-[600px]">
          <div className="flex flex-col gap-3 pr-4">
            {visibleAlerts.map((alert) => {
              const isAcknowledged = acknowledgedAlerts.has(alert.id)
              const isIgnored = ignoredAlerts.has(alert.id)
              return (
                <Card 
                  key={alert.id} 
                  className={`border-border border-l-4 ${severityBorderColors[alert.severity]} bg-card transition-all ${isAcknowledged ? 'opacity-60' : ''} ${isIgnored ? 'opacity-40 bg-muted/30' : ''}`}
                >
                  <CardContent className="pt-6">
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge className={severityColors[alert.severity] + " hover:bg-transparent"}>
                              {alert.severity}
                            </Badge>
                            <span className="text-sm font-semibold text-foreground">{alert.type}</span>
                            {isAcknowledged && (
                              <Badge variant="outline" className="text-[10px] py-0 px-1.5 text-emerald-500 border-emerald-500/30">
                                Acknowledged
                              </Badge>
                            )}
                            {isIgnored && (
                              <Badge variant="outline" className="text-[10px] py-0 px-1.5 text-muted-foreground border-muted-foreground/30">
                                Ignored
                              </Badge>
                            )}
                          </div>
                          <span className="text-xs font-medium text-primary">{alert.device}</span>
                          <p className="text-xs text-muted-foreground leading-relaxed">{alert.description}</p>
                          <span className="text-xs text-muted-foreground">
                            {formatUTCDate(alert.timestamp)}
                          </span>
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 flex-wrap pt-1 border-t border-border">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-border text-xs"
                          onClick={() => setSelectedAlert(alert)}
                        >
                          <Search className="mr-1.5 size-3" />
                          Investigate
                        </Button>
                        
                        {!isAcknowledged && !isIgnored && (
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
                        
                        {!isIgnored && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-muted-foreground hover:text-foreground text-xs"
                            onClick={(e) => handleIgnore(alert.id, e)}
                          >
                            <XCircle className="mr-1.5 size-3" />
                            Ignore
                          </Button>
                        )}

                        {isIgnored && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-xs"
                            onClick={(e) => handleRestore(alert.id, e)}
                          >
                            <Eye className="mr-1.5 size-3" />
                            Restore
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </ScrollArea>
      )}

      {/* Investigation Modal */}
      <Dialog open={!!selectedAlert} onOpenChange={() => setSelectedAlert(null)}>
        <DialogContent className="max-w-2xl border-border bg-card">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-foreground">
              <Shield className="size-5 text-primary" />
              Alert Investigation
            </DialogTitle>
            <DialogDescription>
              Detailed information and recommended actions for this security alert
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
                <span className="text-xs text-muted-foreground font-mono">{selectedAlert.id}</span>
              </div>

              {/* Alert Details Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50 border border-border">
                  <Monitor className="size-4 text-primary mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Affected Device</p>
                    <p className="text-sm font-medium text-foreground">{selectedAlert.device}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50 border border-border">
                  <Clock className="size-4 text-primary mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Detection Time</p>
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
                  Technical Details
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
                      <span className="text-muted-foreground">Hash ({String(selectedAlert.hashType)}):</span>
                      <span className="font-mono text-foreground truncate max-w-[250px]">{String(selectedAlert.hash)}</span>
                    </div>
                  )}
                  {selectedAlert.driverName && (
                    <div className="flex justify-between p-2 rounded bg-background">
                      <span className="text-muted-foreground">Driver:</span>
                      <span className="font-mono text-orange-400">{String(selectedAlert.driverName)}</span>
                    </div>
                  )}
                  {selectedAlert.driverPath && (
                    <div className="flex justify-between p-2 rounded bg-background col-span-2">
                      <span className="text-muted-foreground">Driver Path:</span>
                      <span className="font-mono text-foreground truncate max-w-[280px]">{String(selectedAlert.driverPath)}</span>
                    </div>
                  )}
                  {selectedAlert.port && (
                    <div className="flex justify-between p-2 rounded bg-background">
                      <span className="text-muted-foreground">Port:</span>
                      <span className="font-mono text-orange-400">{String(selectedAlert.port)}</span>
                    </div>
                  )}
                  {selectedAlert.destinationIP && (
                    <div className="flex justify-between p-2 rounded bg-background">
                      <span className="text-muted-foreground">Destination IP:</span>
                      <span className="font-mono text-red-400">{String(selectedAlert.destinationIP)}</span>
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
                  {selectedAlert.affectedFiles && (
                    <div className="flex justify-between p-2 rounded bg-background">
                      <span className="text-muted-foreground">Affected Files:</span>
                      <span className="font-medium text-red-400">{String(selectedAlert.affectedFiles)}</span>
                    </div>
                  )}
                  {selectedAlert.loginTime && (
                    <div className="flex justify-between p-2 rounded bg-background">
                      <span className="text-muted-foreground">Login Time:</span>
                      <span className="font-mono text-orange-400">{String(selectedAlert.loginTime)}</span>
                    </div>
                  )}
                  {selectedAlert.query && (
                    <div className="flex justify-between p-2 rounded bg-background col-span-2">
                      <span className="text-muted-foreground">Query:</span>
                      <span className="font-mono text-foreground truncate max-w-[280px]">{String(selectedAlert.query)}</span>
                    </div>
                  )}
                  {selectedAlert.registryKey && (
                    <div className="flex justify-between p-2 rounded bg-background col-span-2">
                      <span className="text-muted-foreground">Registry Key:</span>
                      <span className="font-mono text-foreground truncate max-w-[250px]">{String(selectedAlert.registryKey)}</span>
                    </div>
                  )}
                  <div className="flex justify-between p-2 rounded bg-background">
                    <span className="text-muted-foreground">Status:</span>
                    <Badge variant="outline" className="text-xs">{selectedAlert.status}</Badge>
                  </div>
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
                    handleAcknowledge(selectedAlert.id)
                    setSelectedAlert(null)
                  }}
                >
                  <CheckCircle2 className="mr-2 size-4" />
                  Acknowledge & Close
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => {
                    handleIgnore(selectedAlert.id)
                    setSelectedAlert(null)
                  }}
                >
                  <XCircle className="mr-2 size-4" />
                  Ignore
                </Button>
                <Button variant="ghost" onClick={() => setSelectedAlert(null)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
