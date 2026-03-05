"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts"
import {
  mockLoginChartData,
  mockFileChangeChartData,
  mockUSBChartData,
  mockAlertTrendData,
  mockDeviceHealthData,
} from "@/lib/mock-data"

const chartTooltipStyle = {
  contentStyle: {
    backgroundColor: "#111827",
    border: "1px solid #1e293b",
    borderRadius: "8px",
    color: "#e2e8f0",
    fontSize: "12px",
  },
}

export function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {/* Login Attempts Over Time */}
      <Card className="border-border bg-[#111827]">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-foreground">Login Attempts Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={mockLoginChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="date" tick={{ fill: "#94a3b8", fontSize: 12 }} stroke="#1e293b" />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} stroke="#1e293b" />
              <Tooltip {...chartTooltipStyle} />
              <Legend wrapperStyle={{ fontSize: "12px", color: "#94a3b8" }} />
              <Line type="monotone" dataKey="success" stroke="#10b981" strokeWidth={2} dot={false} name="Success" />
              <Line type="monotone" dataKey="failed" stroke="#ef4444" strokeWidth={2} dot={false} name="Failed" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* File Changes Per Day */}
      <Card className="border-border bg-[#111827]">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-foreground">File Changes Per Day</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={mockFileChangeChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="date" tick={{ fill: "#94a3b8", fontSize: 12 }} stroke="#1e293b" />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} stroke="#1e293b" />
              <Tooltip {...chartTooltipStyle} />
              <Bar dataKey="changes" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Changes" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* USB Activity Per Day */}
      <Card className="border-border bg-[#111827]">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-foreground">USB Activity Per Day</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={mockUSBChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="date" tick={{ fill: "#94a3b8", fontSize: 12 }} stroke="#1e293b" />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} stroke="#1e293b" />
              <Tooltip {...chartTooltipStyle} />
              <Bar dataKey="insertions" fill="#06b6d4" radius={[4, 4, 0, 0]} name="USB Insertions" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Critical Alerts Trend */}
      <Card className="border-border bg-[#111827]">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-foreground">Alert Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={mockAlertTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="date" tick={{ fill: "#94a3b8", fontSize: 12 }} stroke="#1e293b" />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} stroke="#1e293b" />
              <Tooltip {...chartTooltipStyle} />
              <Legend wrapperStyle={{ fontSize: "12px", color: "#94a3b8" }} />
              <Area type="monotone" dataKey="critical" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} name="Critical" />
              <Area type="monotone" dataKey="high" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} name="High" />
              <Area type="monotone" dataKey="medium" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} name="Medium" />
              <Area type="monotone" dataKey="low" stackId="1" stroke="#64748b" fill="#64748b" fillOpacity={0.3} name="Low" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Device Health Distribution */}
      <Card className="border-border bg-[#111827] lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-foreground">Device Health Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-center">
            <div className="h-[250px] w-[250px]">
              <PieChart width={250} height={250}>
                <Pie
                  data={mockDeviceHealthData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {mockDeviceHealthData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip {...chartTooltipStyle} />
              </PieChart>
            </div>
            <div className="flex flex-col gap-3">
              {mockDeviceHealthData.map((entry) => (
                <div key={entry.name} className="flex items-center gap-3">
                  <div className="size-3 rounded-full" style={{ backgroundColor: entry.fill }} />
                  <span className="text-sm text-muted-foreground">{entry.name}</span>
                  <span className="font-semibold text-foreground">{entry.value}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
