"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockAlerts } from "@/lib/mock-data"
import { useRole } from "@/lib/role-context"
import { formatUTCDate } from "@/lib/utils"

const severityColors: Record<string, string> = {
  critical: "bg-[#ef4444]/15 text-[#ef4444] border-[#ef4444]/30",
  high: "bg-[#f59e0b]/15 text-[#f59e0b] border-[#f59e0b]/30",
  medium: "bg-[#3b82f6]/15 text-[#3b82f6] border-[#3b82f6]/30",
  low: "bg-[#64748b]/15 text-[#94a3b8] border-[#64748b]/30",
}

const statusColors: Record<string, string> = {
  open: "bg-[#ef4444]/15 text-[#ef4444] border-[#ef4444]/30",
  investigating: "bg-[#f59e0b]/15 text-[#f59e0b] border-[#f59e0b]/30",
  resolved: "bg-[#10b981]/15 text-[#10b981] border-[#10b981]/30",
}

export default function AlertsPage() {
  const { isAdmin } = useRole()
  const [severityFilter, setSeverityFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filtered = mockAlerts.filter((a) => {
    if (severityFilter !== "all" && a.severity !== severityFilter) return false
    if (statusFilter !== "all" && a.status !== statusFilter) return false
    return true
  })

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-bold text-foreground">Alerts</h2>
        <p className="text-sm text-muted-foreground">View and manage all security alerts across your infrastructure</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Select value={severityFilter} onValueChange={setSeverityFilter}>
          <SelectTrigger className="w-40 border-border bg-card text-foreground">
            <SelectValue placeholder="Severity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Severities</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40 border-border bg-card text-foreground">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="investigating">Investigating</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="border-border bg-card">
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead className="text-muted-foreground">Timestamp</TableHead>
                <TableHead className="text-muted-foreground">Device</TableHead>
                <TableHead className="text-muted-foreground">Type</TableHead>
                <TableHead className="text-muted-foreground">Severity</TableHead>
                <TableHead className="text-muted-foreground">Description</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                {isAdmin && <TableHead className="text-muted-foreground">Action</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((alert) => (
                <TableRow key={alert.id} className="border-border">
                  <TableCell className="text-xs text-muted-foreground">{formatUTCDate(alert.timestamp)}</TableCell>
                  <TableCell className="text-xs font-medium text-primary">{alert.device}</TableCell>
                  <TableCell className="text-xs text-foreground">{alert.type}</TableCell>
                  <TableCell>
                    <Badge className={severityColors[alert.severity] + " hover:bg-transparent"}>{alert.severity}</Badge>
                  </TableCell>
                  <TableCell className="max-w-[250px] truncate text-xs text-muted-foreground">{alert.description}</TableCell>
                  <TableCell>
                    <Badge className={statusColors[alert.status] + " hover:bg-transparent capitalize"}>{alert.status}</Badge>
                  </TableCell>
                  {isAdmin && (
                    <TableCell>
                      {alert.status !== "resolved" && (
                        <Button variant="outline" size="sm" className="border-border text-xs">
                          Resolve
                        </Button>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
