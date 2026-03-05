"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { mockLoginChartData, mockLoginActivity } from "@/lib/mock-data"
import { LogIn, AlertTriangle } from "lucide-react"
import { formatUTCDate } from "@/lib/utils"
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine,
} from "recharts"

const chartTooltipStyle = {
  contentStyle: {
    backgroundColor: "#111827",
    border: "1px solid #1e293b",
    borderRadius: "8px",
    color: "#e2e8f0",
    fontSize: "12px",
  },
}

// Aggregate top users by login attempts
const userAttempts = mockLoginActivity.reduce<Record<string, { success: number; failed: number }>>((acc, l) => {
  if (!acc[l.user]) acc[l.user] = { success: 0, failed: 0 }
  if (l.success) acc[l.user].success++
  else acc[l.user].failed++
  return acc
}, {})

const topUsers = Object.entries(userAttempts)
  .map(([user, data]) => ({ user, ...data, total: data.success + data.failed }))
  .sort((a, b) => b.total - a.total)
  .slice(0, 8)

export default function LoginAnalyticsPage() {
  const afterHoursLogins = mockLoginActivity.filter((l) => l.afterHours)
  const bruteForceAttempts = mockLoginActivity.filter((l) => !l.success)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-lg bg-[#3b82f6]/15">
          <LogIn className="size-5 text-[#3b82f6]" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">Login Analytics</h2>
          <p className="text-sm text-muted-foreground">Login activity monitoring with brute force and after-hours detection</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border bg-[#111827]">
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex size-10 items-center justify-center rounded-lg bg-[#10b981]/15">
              <LogIn className="size-5 text-[#10b981]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{mockLoginActivity.filter(l => l.success).length}</p>
              <p className="text-xs text-muted-foreground">Successful Logins</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-[#111827]">
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex size-10 items-center justify-center rounded-lg bg-[#ef4444]/15">
              <LogIn className="size-5 text-[#ef4444]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{bruteForceAttempts.length}</p>
              <p className="text-xs text-muted-foreground">Failed Attempts</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-[#111827]">
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex size-10 items-center justify-center rounded-lg bg-[#f59e0b]/15">
              <AlertTriangle className="size-5 text-[#f59e0b]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{afterHoursLogins.length}</p>
              <p className="text-xs text-muted-foreground">After Hours Logins</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-[#111827]">
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex size-10 items-center justify-center rounded-lg bg-[#ef4444]/15">
              <AlertTriangle className="size-5 text-[#ef4444]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {bruteForceAttempts.length >= 5 ? "Detected" : "None"}
              </p>
              <p className="text-xs text-muted-foreground">Brute Force Status</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="border-border bg-[#111827]">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-foreground">Success vs Failed Logins</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={mockLoginChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="date" tick={{ fill: "#94a3b8", fontSize: 12 }} stroke="#1e293b" />
                <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} stroke="#1e293b" />
                <Tooltip {...chartTooltipStyle} />
                <Legend wrapperStyle={{ fontSize: "12px" }} />
                <Line type="monotone" dataKey="success" stroke="#10b981" strokeWidth={2} dot={false} name="Success" />
                <Line type="monotone" dataKey="failed" stroke="#ef4444" strokeWidth={2} dot={false} name="Failed" />
                <ReferenceLine y={10} stroke="#f59e0b" strokeDasharray="5 5" label={{ value: "Brute Force Threshold", fill: "#f59e0b", fontSize: 10 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-border bg-[#111827]">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-foreground">Top Users by Login Attempts</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={topUsers} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis type="number" tick={{ fill: "#94a3b8", fontSize: 12 }} stroke="#1e293b" />
                <YAxis dataKey="user" type="category" tick={{ fill: "#94a3b8", fontSize: 11 }} stroke="#1e293b" width={80} />
                <Tooltip {...chartTooltipStyle} />
                <Legend wrapperStyle={{ fontSize: "12px" }} />
                <Bar dataKey="success" stackId="a" fill="#10b981" name="Success" radius={[0, 0, 0, 0]} />
                <Bar dataKey="failed" stackId="a" fill="#ef4444" name="Failed" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Login Activity Table */}
      <Card className="border-border bg-[#111827]">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-foreground">Recent Login Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead className="text-muted-foreground">User</TableHead>
                <TableHead className="text-muted-foreground">Device</TableHead>
                <TableHead className="text-muted-foreground">Timestamp</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground">Flags</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockLoginActivity.map((login, i) => (
                <TableRow key={i} className={`border-border ${login.afterHours ? "bg-[#f59e0b]/5" : ""}`}>
                  <TableCell className="font-mono text-xs text-foreground">{login.user}</TableCell>
                  <TableCell className="text-xs font-medium text-[#3b82f6]">{login.device}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{formatUTCDate(login.timestamp)}</TableCell>
                  <TableCell>
                    <Badge className={login.success
                      ? "bg-[#10b981]/15 text-[#10b981] border-[#10b981]/30 hover:bg-[#10b981]/15"
                      : "bg-[#ef4444]/15 text-[#ef4444] border-[#ef4444]/30 hover:bg-[#ef4444]/15"
                    }>
                      {login.success ? "Success" : "Failed"}
                    </Badge>
                  </TableCell>
                  <TableCell className="flex gap-1">
                    {login.afterHours && <Badge className="bg-[#f59e0b]/15 text-[#f59e0b] border-[#f59e0b]/30 hover:bg-[#f59e0b]/15">After Hours</Badge>}
                    {!login.success && <Badge className="bg-[#ef4444]/15 text-[#ef4444] border-[#ef4444]/30 hover:bg-[#ef4444]/15">Suspicious</Badge>}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
