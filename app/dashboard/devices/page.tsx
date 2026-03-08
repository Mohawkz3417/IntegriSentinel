"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { mockDevices } from "@/lib/mock-data"
import { Monitor, Search } from "lucide-react"
import { useState } from "react"

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

export default function DevicesPage() {
  const [search, setSearch] = useState("")
  const filtered = mockDevices.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.ip.includes(search) ||
      d.id.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">Monitored Devices</h2>
          <p className="text-sm text-muted-foreground">
            {mockDevices.length} devices registered across your institution
          </p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search devices..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-border bg-card pl-9 text-foreground"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((device) => {
          const riskColor = getRiskColor(device.riskLevel)
          return (
            <Link key={device.id} href={`/dashboard/devices/${device.id}`}>
              <Card className="cursor-pointer border-border bg-card transition-colors hover:border-primary/50">
                <CardContent className="flex flex-col gap-3 pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Monitor className="size-4 text-primary" />
                      <span className="text-sm font-semibold text-foreground">{device.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div
                        className={`size-2 rounded-full ${device.online ? "bg-[#10b981] animate-pulse" : "bg-[#64748b]"}`}
                      />
                      <span className="text-xs text-muted-foreground">
                        {device.online ? "Online" : "Offline"}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                    <span>ID: {device.id}</span>
                    <span>IP: {device.ip}</span>
                    <span>{device.os} {device.osVersion}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge
                      className="hover:bg-transparent"
                      style={{
                        backgroundColor: `${riskColor}15`,
                        color: riskColor,
                        borderColor: `${riskColor}30`,
                      }}
                    >
                      {getRiskLabel(device.riskLevel)} Risk
                    </Badge>
                    <span className="text-xs font-medium" style={{ color: riskColor }}>
                      {device.riskLevel}/100
                    </span>
                  </div>
                  <Progress
                    value={device.riskLevel}
                    className="h-1.5"
                    style={{ backgroundColor: `${riskColor}15` } as React.CSSProperties}
                  />
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
