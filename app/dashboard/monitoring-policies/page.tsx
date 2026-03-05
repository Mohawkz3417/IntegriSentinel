"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { mockDevices } from "@/lib/mock-data"
import { useRole } from "@/lib/role-context"
import { redirect } from "next/navigation"
import { Sliders, FileText, Network, Usb, HardDrive, LogIn, Globe } from "lucide-react"

interface PolicyModule {
  key: string
  label: string
  description: string
  icon: React.ElementType
  enabled: boolean
}

const defaultModules: PolicyModule[] = [
  { key: "file", label: "File Monitoring", description: "Track file creation, modification and deletion across endpoints", icon: FileText, enabled: true },
  { key: "port", label: "Port Monitoring", description: "Monitor open ports and flag suspicious network services", icon: Network, enabled: true },
  { key: "usb", label: "USB Monitoring", description: "Detect USB device insertions and flag unknown devices", icon: Usb, enabled: true },
  { key: "driver", label: "Driver Monitoring", description: "Track driver installations and detect unauthorized changes", icon: HardDrive, enabled: true },
  { key: "login", label: "Login Monitoring", description: "Monitor login activity, brute force detection, after-hours alerts", icon: LogIn, enabled: true },
]

export default function MonitoringPoliciesPage() {
  const { isAdmin } = useRole()
  const [modules, setModules] = useState(defaultModules)
  const [perDeviceOverrides, setPerDeviceOverrides] = useState<Record<string, Record<string, boolean>>>({})

  if (!isAdmin) {
    redirect("/dashboard")
  }

  function toggleGlobal(key: string) {
    setModules((prev) =>
      prev.map((m) => (m.key === key ? { ...m, enabled: !m.enabled } : m))
    )
  }

  function toggleDevicePolicy(deviceId: string, moduleKey: string) {
    setPerDeviceOverrides((prev) => {
      const deviceOverrides = prev[deviceId] || {}
      const globalEnabled = modules.find((m) => m.key === moduleKey)?.enabled ?? true
      const current = deviceOverrides[moduleKey] ?? globalEnabled
      return {
        ...prev,
        [deviceId]: { ...deviceOverrides, [moduleKey]: !current },
      }
    })
  }

  function getDeviceModuleState(deviceId: string, moduleKey: string): boolean {
    if (perDeviceOverrides[deviceId]?.[moduleKey] !== undefined) {
      return perDeviceOverrides[deviceId][moduleKey]
    }
    return modules.find((m) => m.key === moduleKey)?.enabled ?? true
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-lg bg-[#3b82f6]/15">
          <Sliders className="size-5 text-[#3b82f6]" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">Monitoring Policies</h2>
          <p className="text-sm text-muted-foreground">
            Configure monitoring modules and customize per-device policies
          </p>
        </div>
      </div>

      <Card className="border-border bg-[#111827]">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3 rounded-lg border border-[#3b82f6]/20 bg-[#3b82f6]/5 p-4">
            <Globe className="mt-0.5 size-5 shrink-0 text-[#3b82f6]" />
            <div>
              <p className="text-sm font-medium text-foreground">Institutional Policy Customization</p>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                Institutional administrators can customize the monitoring scope based on policy requirements.
                Global toggles apply to all devices by default. Use the per-device overrides below to fine-tune
                monitoring for specific endpoints.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Global Toggles */}
      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Global Monitoring Modules
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((mod) => (
            <Card key={mod.key} className="border-border bg-[#111827]">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className={`flex size-9 items-center justify-center rounded-lg ${mod.enabled ? "bg-[#10b981]/15" : "bg-[#64748b]/15"}`}>
                      <mod.icon className={`size-4 ${mod.enabled ? "text-[#10b981]" : "text-[#64748b]"}`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{mod.label}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">{mod.description}</p>
                    </div>
                  </div>
                  <Switch checked={mod.enabled} onCheckedChange={() => toggleGlobal(mod.key)} />
                </div>
                <div className="mt-3">
                  <Badge className={mod.enabled
                    ? "bg-[#10b981]/15 text-[#10b981] border-[#10b981]/30 hover:bg-[#10b981]/15"
                    : "bg-[#64748b]/15 text-[#94a3b8] border-[#64748b]/30 hover:bg-[#64748b]/15"
                  }>
                    {mod.enabled ? "Active" : "Disabled"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Per Device Toggles */}
      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Per-Device Overrides
        </h3>
        <Card className="border-border bg-[#111827]">
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow className="border-border">
                  <TableHead className="text-muted-foreground">Device</TableHead>
                  {modules.map((mod) => (
                    <TableHead key={mod.key} className="text-center text-muted-foreground">
                      {mod.label.replace(" Monitoring", "")}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockDevices.slice(0, 8).map((device) => (
                  <TableRow key={device.id} className="border-border">
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-xs font-medium text-foreground">{device.name}</span>
                        <span className="text-xs text-muted-foreground">{device.id}</span>
                      </div>
                    </TableCell>
                    {modules.map((mod) => {
                      const enabled = getDeviceModuleState(device.id, mod.key)
                      return (
                        <TableCell key={mod.key} className="text-center">
                          <Switch
                            checked={enabled}
                            onCheckedChange={() => toggleDevicePolicy(device.id, mod.key)}
                            className="mx-auto"
                          />
                        </TableCell>
                      )
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
