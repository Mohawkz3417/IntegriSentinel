"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useDevices, useOpenPorts, useDrivers } from "@/lib/hooks/use-data"
import { useMemo } from "react"
import { Shield, ShieldCheck, AlertTriangle, MonitorX, HardDrive, Loader2, RefreshCw } from "lucide-react"

export function SystemHealthCards() {
  const { data: devices = [], isLoading: devicesLoading, error: devicesError, mutate: devicesMutate } = useDevices()
  const { data: ports = [], isLoading: portsLoading, error: portsError, mutate: portsMutate } = useOpenPorts()
  const { data: drivers = [], isLoading: driversLoading, error: driversError, mutate: driversMutate } = useDrivers()

  const isLoading = devicesLoading || portsLoading || driversLoading
  const hasError = devicesError || portsError || driversError

  const handleRetry = () => {
    devicesMutate()
    portsMutate()
    driversMutate()
  }

  // Calculate health data from live data
  const healthData = useMemo(() => {
    const totalDevices = devices.length
    const firewallEnabled = devices.filter((d) => d.firewall).length
    const antivirusActive = devices.filter((d) => d.antivirus).length
    // Consider "outdated" if OS version contains older indicators
    const outdatedOS = devices.filter((d) => 
      d.osVersion.includes("20H2") || d.osVersion.includes("21H2") || d.osVersion.includes("20.04")
    ).length
    const suspiciousPorts = ports.filter((p) => p.suspicious).length
    const driverChanges = drivers.filter((d) => d.newlyAdded).length

    return [
      { label: "Firewall Enabled", value: `${firewallEnabled}/${totalDevices}`, icon: Shield, color: "#10b981" },
      { label: "Antivirus Active", value: `${antivirusActive}/${totalDevices}`, icon: ShieldCheck, color: "#3b82f6" },
      { label: "Outdated OS", value: String(outdatedOS), icon: MonitorX, color: "#f59e0b" },
      { label: "Suspicious Ports", value: String(suspiciousPorts), icon: AlertTriangle, color: "#ef4444" },
      { label: "Driver Changes", value: String(driverChanges), icon: HardDrive, color: "#06b6d4" },
    ]
  }, [devices, ports, drivers])

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i} className="border-border bg-card animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-4 w-20 bg-muted rounded" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="size-10 bg-muted rounded-lg" />
                <div className="h-6 w-12 bg-muted rounded" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (hasError) {
    return (
      <Card className="border-destructive/50 bg-destructive/5">
        <CardContent className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="size-5 text-destructive" />
            <div>
              <p className="text-sm font-medium text-foreground">Failed to load system health</p>
              <p className="text-xs text-muted-foreground">Check Flask backend connection</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleRetry}>
            <RefreshCw className="size-4 mr-2" />
            Retry
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {healthData.map((item) => (
        <Card
          key={item.label}
          className="group border-border dark:border-cyan-500/20 bg-card dark:bg-gradient-to-br dark:from-slate-900/50 dark:to-slate-800/30 hover:border-primary dark:hover:border-cyan-500/40 hover:shadow-md dark:hover:shadow-lg transition-all duration-200 overflow-hidden relative"
        >
          <CardHeader className="pb-2 relative z-10">
            <CardTitle className="text-xs font-medium text-muted-foreground group-hover:text-primary dark:group-hover:text-cyan-300 transition-colors duration-200">
              {item.label}
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="flex items-center gap-3">
              <div
                className="flex size-10 items-center justify-center rounded-lg border transition-all duration-200"
                style={{
                  backgroundColor: `${item.color}15`,
                  borderColor: `${item.color}30`,
                }}
              >
                <item.icon className="size-5" style={{ color: item.color }} />
              </div>
              <span className="text-xl font-bold text-foreground group-hover:text-primary dark:group-hover:text-cyan-300 transition-colors duration-200">{item.value}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
