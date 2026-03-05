"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { mockDatabaseLogs } from "@/lib/mock-data"
import { useRole } from "@/lib/role-context"
import { redirect } from "next/navigation"
import { Database, Search, ChevronDown, ChevronRight } from "lucide-react"
import { formatUTCDate } from "@/lib/utils"

export default function DatabaseLogsPage() {
  const { isAdmin } = useRole()
  const [searchQuery, setSearchQuery] = useState("")
  const [deviceFilter, setDeviceFilter] = useState("all")
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set())

  if (!isAdmin) {
    redirect("/dashboard")
  }

  const devices = Array.from(new Set(mockDatabaseLogs.map((l) => l.device)))

  const filtered = mockDatabaseLogs.filter((log) => {
    if (deviceFilter !== "all" && log.device !== deviceFilter) return false
    if (searchQuery) {
      const jsonStr = JSON.stringify(log.data).toLowerCase()
      if (
        !jsonStr.includes(searchQuery.toLowerCase()) &&
        !log.device.toLowerCase().includes(searchQuery.toLowerCase())
      )
        return false
    }
    return true
  })

  function toggleExpand(id: number) {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="flex items-start gap-4 rounded-lg border border-cyan-500/20 bg-gradient-to-r from-slate-900/50 to-slate-800/30 p-6">
        <div className="flex size-12 items-center justify-center rounded-lg border border-cyan-500/30 bg-gradient-to-br from-cyan-500/20 to-cyan-500/10 shadow-lg shadow-cyan-500/10">
          <Database className="size-6 text-cyan-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Database Logs & Telemetry</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Real-time JSON telemetry logs and security events from monitored agents
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 rounded-lg border border-cyan-500/10 bg-slate-900/30 p-4">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search logs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-cyan-500/20 bg-slate-900/50 pl-9 text-foreground focus:border-cyan-500/50 focus:ring-cyan-500/20"
          />
        </div>
        <Select value={deviceFilter} onValueChange={setDeviceFilter}>
          <SelectTrigger className="w-48 border-cyan-500/20 bg-slate-900/50 text-foreground focus:border-cyan-500/50">
            <SelectValue placeholder="Device" />
          </SelectTrigger>
          <SelectContent className="bg-slate-900 border-cyan-500/20">
            <SelectItem value="all">All Devices</SelectItem>
            {devices.map((d) => (
              <SelectItem key={d} value={d}>
                {d}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Badge className="bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 text-cyan-300 border-cyan-500/30 hover:from-cyan-500/30 hover:to-emerald-500/30 shadow-lg shadow-cyan-500/10">
          {filtered.length} logs
        </Badge>
      </div>

      {/* Logs */}
      <ScrollArea className="h-[600px] rounded-lg border border-cyan-500/10">
        <div className="flex flex-col gap-3 pr-4">
          {filtered.map((log, index) => {
            const expanded = expandedIds.has(log.id)
            return (
              <Card
                key={log.id}
                className="border-cyan-500/20 bg-gradient-to-r from-slate-900/50 to-slate-800/30 hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 group animate-slide-up"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <CardContent className="pt-4 pb-4">
                  <button
                    onClick={() => toggleExpand(log.id)}
                    className="flex w-full items-center justify-between text-left hover:opacity-80 transition-opacity"
                  >
                    <div className="flex items-center gap-3">
                      {expanded ? (
                        <ChevronDown className="size-4 text-cyan-400 transition-colors" />
                      ) : (
                        <ChevronRight className="size-4 text-muted-foreground group-hover:text-cyan-400 transition-colors" />
                      )}
                      <span className="text-xs font-medium text-cyan-400 group-hover:text-cyan-300 transition-colors">{log.device}</span>
                      <Badge className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border-amber-500/30 text-[10px]">
                        {log.data.event.replace(/_/g, " ").toUpperCase()}
                      </Badge>
                    </div>
                    <span className="text-xs text-muted-foreground group-hover:text-cyan-300/70 transition-colors">
                      {formatUTCDate(log.timestamp)}
                    </span>
                  </button>
                  {expanded && (
                    <div className="mt-3 rounded-lg border border-cyan-500/20 bg-slate-900/60 p-4 backdrop-blur-sm animate-slide-up">
                      <pre className="overflow-x-auto text-xs leading-relaxed text-cyan-100 font-mono">
                        {JSON.stringify(log.data, null, 2)}
                      </pre>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
          {filtered.length === 0 && (
            <div className="py-12 text-center text-sm text-muted-foreground">
              No logs match your search criteria
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
