"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { mockDevices, mockRiskTrendData } from "@/lib/mock-data"
import { TrendingUp } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const chartTooltipStyle = {
  contentStyle: {
    backgroundColor: "#111827",
    border: "1px solid #1e293b",
    borderRadius: "8px",
    color: "#e2e8f0",
    fontSize: "12px",
  },
}

function getRiskColor(risk: number) {
  if (risk <= 25) return "#10b981"
  if (risk <= 50) return "#f59e0b"
  if (risk <= 75) return "#ef4444"
  return "#dc2626"
}

function getRiskLabel(risk: number) {
  if (risk <= 25) return "Low"
  if (risk <= 50) return "Medium"
  if (risk <= 75) return "High"
  return "Critical"
}

const sortedDevices = [...mockDevices].sort((a, b) => b.riskLevel - a.riskLevel)

export default function RiskIntelligencePage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-lg bg-[#f59e0b]/15">
          <TrendingUp className="size-5 text-[#f59e0b]" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">Risk Intelligence</h2>
          <p className="text-sm text-muted-foreground">Devices ranked by risk with trend analysis</p>
        </div>
      </div>

      {/* Risk Trend Chart */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-foreground">Institutional Risk Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockRiskTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="date" tick={{ fill: "#94a3b8", fontSize: 12 }} stroke="#1e293b" />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} stroke="#1e293b" domain={[0, 100]} />
              <Tooltip {...chartTooltipStyle} />
              <Line type="monotone" dataKey="score" stroke="#f59e0b" strokeWidth={2} dot={{ fill: "#f59e0b", r: 4 }} name="Risk Score" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Risk Ranking */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-foreground">Devices Ranked by Risk</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead className="text-muted-foreground">Rank</TableHead>
                <TableHead className="text-muted-foreground">Device</TableHead>
                <TableHead className="text-muted-foreground">Department</TableHead>
                <TableHead className="text-muted-foreground">Risk Score</TableHead>
                <TableHead className="text-muted-foreground">Risk Level</TableHead>
                <TableHead className="text-muted-foreground">Key Factors</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedDevices.map((device, i) => {
                const riskColor = getRiskColor(device.riskLevel)
                const factors = []
                if (!device.antivirus) factors.push("No AV")
                if (!device.firewall) factors.push("No FW")
                if (!device.online) factors.push("Offline")
                if (device.riskLevel > 50) factors.push("High Exposure")
                return (
                  <TableRow key={device.id} className="border-border">
                    <TableCell className="text-sm font-bold text-foreground">#{i + 1}</TableCell>
                    <TableCell className="text-xs font-medium text-primary">{device.name}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{device.department}</TableCell>
                    <TableCell>
                      <span className="text-sm font-bold" style={{ color: riskColor }}>{device.riskLevel}/100</span>
                    </TableCell>
                    <TableCell>
                      <Badge className="hover:bg-transparent" style={{ backgroundColor: `${riskColor}15`, color: riskColor, borderColor: `${riskColor}30` }}>
                        {getRiskLabel(device.riskLevel)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {factors.map((f) => (
                          <Badge key={f} variant="outline" className="text-xs text-muted-foreground">{f}</Badge>
                        ))}
                        {factors.length === 0 && <span className="text-xs text-muted-foreground">None</span>}
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Risk Breakdown */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-foreground">Risk Factor Explanation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { factor: "Failed Login Spikes", desc: "Multiple failed logins in a short time indicate potential brute force attacks", color: "#ef4444" },
              { factor: "Critical Alerts", desc: "Unresolved critical security alerts raise overall risk", color: "#ef4444" },
              { factor: "Firewall Disabled", desc: "Devices without active firewalls are exposed to network attacks", color: "#f59e0b" },
              { factor: "Suspicious Open Ports", desc: "Uncommon open ports may indicate compromise or misconfiguration", color: "#f59e0b" },
              { factor: "Malicious Hash Detected", desc: "Files matching known malicious hashes require immediate action", color: "#ef4444" },
              { factor: "Outdated OS", desc: "Unpatched systems are vulnerable to known exploits", color: "#06b6d4" },
            ].map((item) => (
              <div key={item.factor} className="rounded-lg border border-border bg-secondary p-4">
                <div className="mb-2 flex items-center gap-2">
                  <div className="size-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm font-medium text-foreground">{item.factor}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
