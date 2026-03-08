"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockFileChanges } from "@/lib/mock-data"
import { FileText, Search } from "lucide-react"
import { formatUTCDate } from "@/lib/utils"

export default function FileIntegrityPage() {
  const [search, setSearch] = useState("")
  const [actionFilter, setActionFilter] = useState("all")
  const [criticalOnly, setCriticalOnly] = useState(false)

  const filtered = mockFileChanges.filter((f) => {
    if (search && !f.path.toLowerCase().includes(search.toLowerCase()) && !f.device.toLowerCase().includes(search.toLowerCase())) return false
    if (actionFilter !== "all" && f.action !== actionFilter) return false
    if (criticalOnly && !f.critical) return false
    return true
  })

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-lg bg-[#3b82f6]/15">
          <FileText className="size-5 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">File Integrity Monitoring</h2>
          <p className="text-sm text-muted-foreground">Track file modifications across all monitored endpoints</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search files or devices..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-border bg-card pl-9 text-foreground"
          />
        </div>
        <Select value={actionFilter} onValueChange={setActionFilter}>
          <SelectTrigger className="w-36 border-border bg-card text-foreground">
            <SelectValue placeholder="Action" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Actions</SelectItem>
            <SelectItem value="Created">Created</SelectItem>
            <SelectItem value="Modified">Modified</SelectItem>
            <SelectItem value="Deleted">Deleted</SelectItem>
          </SelectContent>
        </Select>
        <button
          onClick={() => setCriticalOnly(!criticalOnly)}
          className={`rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
            criticalOnly
              ? "border-[#ef4444]/30 bg-[#ef4444]/15 text-[#ef4444]"
              : "border-border bg-card text-muted-foreground hover:text-foreground"
          }`}
        >
          Critical Only
        </button>
      </div>

      <Card className="border-border bg-card">
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead className="text-muted-foreground">File Path</TableHead>
                <TableHead className="text-muted-foreground">Action</TableHead>
                <TableHead className="text-muted-foreground">User</TableHead>
                <TableHead className="text-muted-foreground">Device</TableHead>
                <TableHead className="text-muted-foreground">Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((file, i) => (
                <TableRow key={i} className={`border-border ${file.critical ? "bg-[#ef4444]/5" : ""}`}>
                  <TableCell className="max-w-[300px] truncate font-mono text-xs text-foreground">
                    {file.critical && <Badge className="mr-2 bg-[#ef4444]/15 text-[#ef4444] border-[#ef4444]/30 hover:bg-[#ef4444]/15">Critical</Badge>}
                    {file.path}
                  </TableCell>
                  <TableCell>
                    <Badge className={
                      file.action === "Created" ? "bg-[#10b981]/15 text-[#10b981] border-[#10b981]/30 hover:bg-[#10b981]/15" :
                      file.action === "Modified" ? "bg-[#f59e0b]/15 text-[#f59e0b] border-[#f59e0b]/30 hover:bg-[#f59e0b]/15" :
                      "bg-[#ef4444]/15 text-[#ef4444] border-[#ef4444]/30 hover:bg-[#ef4444]/15"
                    }>{file.action}</Badge>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{file.user}</TableCell>
                  <TableCell className="text-xs font-medium text-primary">{file.device}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{formatUTCDate(file.timestamp)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
