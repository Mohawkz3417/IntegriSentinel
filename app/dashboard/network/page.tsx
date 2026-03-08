"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { mockOpenPorts, mockDevices } from "@/lib/mock-data"
import { Network, Shield, ShieldOff } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const chartTooltipStyle = {
  contentStyle: {
    backgroundColor: "#111827",
    border: "1px solid #1e293b",
    borderRadius: "8px",
    color: "#e2e8f0",
    fontSize: "12px",
  },
}

// Ports per device
const portsPerDevice = mockDevices.map((d) => ({
  device: d.name,
  total: mockOpenPorts.filter((p) => p.device === d.name).length,
  suspicious: mockOpenPorts.filter((p) => p.device === d.name && p.suspicious).length,
})).filter((d) => d.total > 0)

export default function NetworkPage() {
  const totalPorts = mockOpenPorts.length
  const suspiciousPorts = mockOpenPorts.filter((p) => p.suspicious).length
  const firewallEnabled = mockDevices.filter((d) => d.firewall).length
  const firewallDisabled = mockDevices.filter((d) => !d.firewall).length

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-lg bg-[#06b6d4]/15">
          <Network className="size-5 text-[#06b6d4]" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">Network & Ports</h2>
          <p className="text-sm text-muted-foreground">Open ports monitoring and firewall status across devices</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card className="border-border bg-card">
          <CardContent className="flex flex-col items-center gap-1 pt-6">
            <span className="text-3xl font-bold text-foreground">{totalPorts}</span>
            <span className="text-xs text-muted-foreground">Open Ports</span>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="flex flex-col items-center gap-1 pt-6">
            <span className="text-3xl font-bold text-[#ef4444]">{suspiciousPorts}</span>
            <span className="text-xs text-muted-foreground">Suspicious Ports</span>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="flex flex-col items-center gap-1 pt-6">
            <div className="flex items-center gap-2">
              <Shield className="size-5 text-[#10b981]" />
              <span className="text-3xl font-bold text-[#10b981]">{firewallEnabled}</span>
            </div>
            <span className="text-xs text-muted-foreground">Firewall Enabled</span>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="flex flex-col items-center gap-1 pt-6">
            <div className="flex items-center gap-2">
              <ShieldOff className="size-5 text-[#ef4444]" />
              <span className="text-3xl font-bold text-[#ef4444]">{firewallDisabled}</span>
            </div>
            <span className="text-xs text-muted-foreground">Firewall Disabled</span>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-foreground">Open Ports by Device</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={portsPerDevice}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="device" tick={{ fill: "#94a3b8", fontSize: 10 }} stroke="#1e293b" angle={-30} textAnchor="end" height={60} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} stroke="#1e293b" />
              <Tooltip {...chartTooltipStyle} />
              <Bar dataKey="total" fill="#3b82f6" name="Total Ports" radius={[4, 4, 0, 0]} />
              <Bar dataKey="suspicious" fill="#ef4444" name="Suspicious" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Ports Table */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-foreground">All Open Ports</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead className="text-muted-foreground">Device</TableHead>
                <TableHead className="text-muted-foreground">Port</TableHead>
                <TableHead className="text-muted-foreground">Service</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockOpenPorts.map((port, i) => (
                <TableRow key={i} className={`border-border ${port.suspicious ? "bg-[#ef4444]/5" : ""}`}>
                  <TableCell className="text-xs font-medium text-primary">{port.device}</TableCell>
                  <TableCell className="font-mono text-xs text-foreground">{port.port}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{port.service}</TableCell>
                  <TableCell>
                    <Badge className={port.suspicious
                      ? "bg-[#ef4444]/15 text-[#ef4444] border-[#ef4444]/30 hover:bg-[#ef4444]/15"
                      : "bg-[#10b981]/15 text-[#10b981] border-[#10b981]/30 hover:bg-[#10b981]/15"
                    }>
                      {port.suspicious ? "Suspicious" : "Normal"}
                    </Badge>
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
