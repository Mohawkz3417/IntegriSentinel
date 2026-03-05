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
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-lg bg-[#3b82f6]/15">
          <Database className="size-5 text-[#3b82f6]" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">Database Logs</h2>
          <p className="text-sm text-muted-foreground">
            Raw JSON telemetry logs received from monitored agents
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search logs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-border bg-[#111827] pl-9 text-foreground"
          />
        </div>
        <Select value={deviceFilter} onValueChange={setDeviceFilter}>
          <SelectTrigger className="w-48 border-border bg-[#111827] text-foreground">
            <SelectValue placeholder="Device" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Devices</SelectItem>
            {devices.map((d) => (
              <SelectItem key={d} value={d}>
                {d}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Badge className="bg-[#3b82f6]/15 text-[#3b82f6] border-[#3b82f6]/30 hover:bg-[#3b82f6]/15">
          {filtered.length} logs
        </Badge>
      </div>

      {/* Logs */}
      <ScrollArea className="h-[600px]">
        <div className="flex flex-col gap-3 pr-4">
          {filtered.map((log) => {
            const expanded = expandedIds.has(log.id)
            return (
              <Card key={log.id} className="border-border bg-[#111827]">
                <CardContent className="pt-4 pb-4">
                  <button
                    onClick={() => toggleExpand(log.id)}
                    className="flex w-full items-center justify-between text-left"
                  >
                    <div className="flex items-center gap-3">
                      {expanded ? (
                        <ChevronDown className="size-4 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="size-4 text-muted-foreground" />
                      )}
                      <span className="text-xs font-medium text-[#3b82f6]">{log.device}</span>
                      <Badge className="bg-[#1e293b] text-muted-foreground border-border hover:bg-[#1e293b]">
                        {log.data.event}
                      </Badge>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {formatUTCDate(log.timestamp)}
                    </span>
                  </button>
                  {expanded && (
                    <div className="mt-3 rounded-lg border border-border bg-[#0a0e1a] p-4">
                      <pre className="overflow-x-auto text-xs leading-relaxed text-foreground">
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
