"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useDevices } from "@/lib/hooks/use-data"
import { Monitor, Search, MapPin, ArrowLeft, Building2, Loader2 } from "lucide-react"
import { useState, Suspense } from "react"

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

function DevicesContent() {
  const searchParams = useSearchParams()
  const entityFilter = searchParams.get("entity")
  const [search, setSearch] = useState("")
  
  // Fetch devices using SWR (auto-refreshes from Flask backend when configured)
  const { data: allDevices = [], isLoading, error } = useDevices()

  // Filter by entity/department first, then by search
  const entityFilteredDevices = entityFilter
    ? allDevices.filter((d) => d.department === entityFilter)
    : allDevices

  const filtered = entityFilteredDevices.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.ip.includes(search) ||
      d.id.toLowerCase().includes(search.toLowerCase())
  )

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Loader2 className="size-8 animate-spin text-primary mb-4" />
        <p className="text-sm text-muted-foreground">Loading devices...</p>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-destructive/50 bg-destructive/5 py-16">
        <p className="text-sm text-destructive">Failed to load devices. Please try again.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Entity Header - shows when filtering by entity */}
      {entityFilter && (
        <div className="flex items-center gap-4 rounded-lg border border-border dark:border-cyan-500/20 bg-card dark:bg-gradient-to-r dark:from-slate-900/50 dark:to-slate-800/30 p-4 backdrop-blur-sm">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-primary/30 dark:border-cyan-500/30 bg-primary/10 dark:bg-gradient-to-br dark:from-cyan-500/20 dark:to-cyan-500/10">
            <MapPin className="size-5 text-primary dark:text-cyan-400" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-foreground dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-cyan-400 dark:to-emerald-400">
              {entityFilter}
            </h2>
            <p className="text-sm text-muted-foreground">
              {entityFilteredDevices.length} device{entityFilteredDevices.length !== 1 ? "s" : ""} in this entity
            </p>
          </div>
          <Link href="/dashboard/devices">
            <Button variant="outline" size="sm" className="gap-2 border-border hover:border-primary/50">
              <ArrowLeft className="size-4" />
              View All Devices
            </Button>
          </Link>
        </div>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          {!entityFilter && (
            <>
              <h2 className="text-xl font-bold text-foreground">Monitored Devices</h2>
              <p className="text-sm text-muted-foreground">
                {allDevices.length} devices registered across your institution
              </p>
            </>
          )}
          {entityFilter && (
            <p className="text-sm text-muted-foreground">
              Showing devices in <span className="font-medium text-foreground">{entityFilter}</span>
            </p>
          )}
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={entityFilter ? `Search in ${entityFilter}...` : "Search devices..."}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-border bg-card pl-9 text-foreground"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-card/50 py-16">
          <div className="flex size-14 items-center justify-center rounded-full bg-muted mb-4">
            <Monitor className="size-7 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-1">No Devices Found</h3>
          <p className="text-sm text-muted-foreground text-center max-w-sm">
            {entityFilter
              ? `No devices are registered in "${entityFilter}". Devices may be assigned to a different entity.`
              : "No devices match your search criteria."}
          </p>
          {entityFilter && (
            <Link href="/dashboard/devices" className="mt-4">
              <Button variant="outline" size="sm" className="gap-2">
                <Building2 className="size-4" />
                View All Institution Devices
              </Button>
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((device) => {
            const riskColor = getRiskColor(device.riskLevel)
            return (
              <Link key={device.id} href={`/dashboard/devices/${device.id}`}>
                <Card className="cursor-pointer border-border bg-card transition-all hover:border-primary/50 hover:shadow-lg dark:hover:shadow-cyan-500/10">
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
                    {/* Show department badge when not filtering by entity */}
                    {!entityFilter && (
                      <div className="flex items-center gap-1.5">
                        <MapPin className="size-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{device.department}</span>
                      </div>
                    )}
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
      )}
    </div>
  )
}

export default function DevicesPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground">Monitored Devices</h2>
            <p className="text-sm text-muted-foreground">Loading devices...</p>
          </div>
        </div>
      </div>
    }>
      <DevicesContent />
    </Suspense>
  )
}
