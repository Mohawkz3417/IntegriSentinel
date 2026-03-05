"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts"
import { DeviceHealthChart } from "@/components/dashboard/device-health-chart"
import {
  mockLoginChartData,
  mockFileChangeChartData,
  mockUSBChartData,
  mockAlertTrendData,
} from "@/lib/mock-data"

const chartTooltipStyle = {
  contentStyle: {
    backgroundColor: "#0f172a",
    border: "1px solid #1a2540",
    borderRadius: "8px",
    color: "#e2e8f0",
    fontSize: "12px",
    boxShadow: "0 0 12px rgba(0, 212, 255, 0.1)",
  },
}

export function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {/* Login Attempts Over Time */}
      <Card className="border-cyan-500/20 bg-gradient-to-br from-slate-900/50 to-slate-800/30 overflow-hidden group hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/10 transition-all animate-slide-up">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
        <CardHeader className="border-b border-cyan-500/10 pb-3 relative z-10">
          <CardTitle className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Login Attempts Over Time</CardTitle>
        </CardHeader>
        <CardContent className="pt-4 relative z-10">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={mockLoginChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a2540" opacity={0.3} />
              <XAxis dataKey="date" tick={{ fill: "#94a3b8", fontSize: 12 }} stroke="#1a2540" opacity={0.3} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} stroke="#1a2540" opacity={0.3} />
              <Tooltip {...chartTooltipStyle} />
              <Legend wrapperStyle={{ fontSize: "12px", color: "#94a3b8" }} />
              <Line type="monotone" dataKey="success" stroke="#10b981" strokeWidth={3} dot={false} name="Success" />
              <Line type="monotone" dataKey="failed" stroke="#ef4444" strokeWidth={3} dot={false} name="Failed" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* File Changes Per Day */}
      <Card className="border-cyan-500/20 bg-gradient-to-br from-slate-900/50 to-slate-800/30 overflow-hidden group hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/10 transition-all animate-slide-up" style={{ animationDelay: "50ms" }}>
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
        <CardHeader className="border-b border-cyan-500/10 pb-3 relative z-10">
          <CardTitle className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">File Changes Per Day</CardTitle>
        </CardHeader>
        <CardContent className="pt-4 relative z-10">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={mockFileChangeChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a2540" opacity={0.3} />
              <XAxis dataKey="date" tick={{ fill: "#94a3b8", fontSize: 12 }} stroke="#1a2540" opacity={0.3} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} stroke="#1a2540" opacity={0.3} />
              <Tooltip {...chartTooltipStyle} />
              <Bar dataKey="changes" fill="#00d4ff" radius={[6, 6, 0, 0]} name="Changes" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* USB Activity Per Day */}
      <Card className="border-cyan-500/20 bg-gradient-to-br from-slate-900/50 to-slate-800/30 overflow-hidden group hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/10 transition-all animate-slide-up" style={{ animationDelay: "100ms" }}>
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
        <CardHeader className="border-b border-cyan-500/10 pb-3 relative z-10">
          <CardTitle className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">USB Activity Per Day</CardTitle>
        </CardHeader>
        <CardContent className="pt-4 relative z-10">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={mockUSBChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a2540" opacity={0.3} />
              <XAxis dataKey="date" tick={{ fill: "#94a3b8", fontSize: 12 }} stroke="#1a2540" opacity={0.3} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} stroke="#1a2540" opacity={0.3} />
              <Tooltip {...chartTooltipStyle} />
              <Bar dataKey="insertions" fill="#00ffaa" radius={[6, 6, 0, 0]} name="USB Insertions" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Critical Alerts Trend */}
      <Card className="border-cyan-500/20 bg-gradient-to-br from-slate-900/50 to-slate-800/30 overflow-hidden group hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/10 transition-all animate-slide-up" style={{ animationDelay: "150ms" }}>
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
        <CardHeader className="border-b border-cyan-500/10 pb-3 relative z-10">
          <CardTitle className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Alert Trends</CardTitle>
        </CardHeader>
        <CardContent className="pt-4 relative z-10">
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={mockAlertTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a2540" opacity={0.3} />
              <XAxis dataKey="date" tick={{ fill: "#94a3b8", fontSize: 12 }} stroke="#1a2540" opacity={0.3} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} stroke="#1a2540" opacity={0.3} />
              <Tooltip {...chartTooltipStyle} />
              <Legend wrapperStyle={{ fontSize: "12px", color: "#94a3b8" }} />
              <Area type="monotone" dataKey="critical" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.4} name="Critical" />
              <Area type="monotone" dataKey="high" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.4} name="High" />
              <Area type="monotone" dataKey="medium" stackId="1" stroke="#00d4ff" fill="#00d4ff" fillOpacity={0.4} name="Medium" />
              <Area type="monotone" dataKey="low" stackId="1" stroke="#64748b" fill="#64748b" fillOpacity={0.3} name="Low" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Device Health Distribution */}
      <DeviceHealthChart />
    </div>
  )
}
