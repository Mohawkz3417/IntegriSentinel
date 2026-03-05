"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockDatabaseLogs } from "@/lib/mock-data"
import { Clock, Database, Eye, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

function getEventIcon(event: string) {
  switch (event) {
    case "brute_force_detected":
      return "🔓"
    case "firewall_disabled":
      return "🛡️"
    case "malicious_hash_match":
      return "⚠️"
    case "file_modified":
      return "📝"
    case "after_hours_login":
      return "🌙"
    default:
      return "📌"
  }
}

function getEventColor(event: string) {
  switch (event) {
    case "brute_force_detected":
      return "bg-red-500/20 text-red-300 border-red-500/30"
    case "firewall_disabled":
      return "bg-orange-500/20 text-orange-300 border-orange-500/30"
    case "malicious_hash_match":
      return "bg-red-500/20 text-red-300 border-red-500/30"
    case "file_modified":
      return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
    case "after_hours_login":
      return "bg-purple-500/20 text-purple-300 border-purple-500/30"
    default:
      return "bg-cyan-500/20 text-cyan-300 border-cyan-500/30"
  }
}

export function AuditLogs() {
  return (
    <Card className="border-cyan-500/20 bg-gradient-to-br from-slate-900/50 to-slate-800/30 overflow-hidden lg:col-span-1">
      <CardHeader className="border-b border-cyan-500/10 pb-4 flex flex-row items-start justify-between">
        <div>
          <CardTitle className="text-lg flex items-center gap-2">
            <Database className="size-5 text-cyan-500" />
            Database Audit Logs
          </CardTitle>
          <CardDescription>Real-time security events and changes</CardDescription>
        </div>
        <Button
          size="sm"
          variant="outline"
          className="border-cyan-500/20 hover:bg-cyan-500/10"
        >
          <Download className="size-3.5 mr-1" />
          Export
        </Button>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {mockDatabaseLogs.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No audit logs available</p>
            </div>
          ) : (
            mockDatabaseLogs.map((log, index) => (
              <div
                key={log.id}
                className="border border-cyan-500/10 rounded-lg bg-slate-900/30 hover:bg-slate-900/60 hover:border-cyan-500/20 p-3 transition-all group animate-slide-up"
                style={{ animationDelay: `${index * 40}ms` }}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1 text-lg">{getEventIcon(log.data.event)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-medium text-sm text-foreground group-hover:text-cyan-300 transition-colors">
                        {log.data.event.replace(/_/g, " ").toUpperCase()}
                      </span>
                      <Badge className={`text-[10px] ${getEventColor(log.data.event)}`}>
                        {log.device}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
                      {JSON.stringify(log.data).substring(0, 80)}...
                    </p>
                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                      <Clock className="size-3" />
                      {new Date(log.timestamp).toLocaleString()}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="shrink-0 hover:bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Eye className="size-3.5 text-muted-foreground hover:text-cyan-300" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
