"use client"

import { use } from "react"
import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import {
  useDevice, useAlerts, useFileChanges, useUSBDevices,
  useOpenPorts, useDrivers, useLoginActivity,
} from "@/lib/hooks/use-data"
import {
  ArrowLeft, Monitor, Shield, AlertTriangle, Usb, HardDrive, FileText, LogIn,
  Network, Loader2,
} from "lucide-react"
import Link from "next/link"
import { formatUTCDate } from "@/lib/utils"
import { useMemo } from "react"

function getRiskColor(risk: number) {
  if (risk <= 25) return "#10b981"
  if (risk <= 50) return "#f59e0b"
  if (risk <= 75) return "#ef4444"
  return "#dc2626"
}

export default function DeviceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  
  // Fetch all data using SWR hooks
  const { data: device, isLoading: deviceLoading, error: deviceError } = useDevice(id)
  const { data: allAlerts = [] } = useAlerts()
  const { data: allFileChanges = [] } = useFileChanges()
  const { data: allUSBDevices = [] } = useUSBDevices()
  const { data: allOpenPorts = [] } = useOpenPorts()
  const { data: allDrivers = [] } = useDrivers()
  const { data: allLoginActivity = [] } = useLoginActivity()

  // Filter data for this device
  const deviceAlerts = useMemo(() => 
    device ? allAlerts.filter((a) => a.device === device.name) : [], 
    [allAlerts, device]
  )
  const deviceFiles = useMemo(() => 
    device ? allFileChanges.filter((f) => f.device === device.name) : [], 
    [allFileChanges, device]
  )
  const deviceUSB = useMemo(() => 
    device ? allUSBDevices.filter((u) => u.device === device.name) : [], 
    [allUSBDevices, device]
  )
  const devicePorts = useMemo(() => 
    device ? allOpenPorts.filter((p) => p.device === device.name) : [], 
    [allOpenPorts, device]
  )
  const deviceDrivers = useMemo(() => 
    device ? allDrivers.filter((d) => d.device === device.name) : [], 
    [allDrivers, device]
  )
  const deviceLogins = useMemo(() => 
    device ? allLoginActivity.filter((l) => l.device === device.name) : [], 
    [allLoginActivity, device]
  )

  // Loading state
  if (deviceLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Loader2 className="size-8 animate-spin text-primary mb-4" />
        <p className="text-sm text-muted-foreground">Loading device details...</p>
      </div>
    )
  }

  // Error or not found
  if (deviceError || !device) return notFound()

  const riskColor = getRiskColor(device.riskLevel)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Link href="/dashboard/devices">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-xl font-bold text-foreground">{device.name}</h2>
          <p className="text-sm text-muted-foreground">{device.id} - {device.ip}</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <div className={`size-2.5 rounded-full ${device.online ? "bg-[#10b981] animate-pulse" : "bg-[#64748b]"}`} />
          <span className="text-sm font-medium text-foreground">
            {device.online ? "Online" : "Offline"}
          </span>
        </div>
      </div>

      {/* Device Overview */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-border bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Monitor className="size-4 text-primary" /> System Info
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">OS</span><span className="text-foreground">{device.os} {device.osVersion}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Architecture</span><span className="text-foreground">{device.arch}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Processor</span><span className="text-foreground">{device.processor}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">MAC Address</span><span className="text-foreground font-mono text-xs">{device.mac}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Boot Time</span><span className="text-foreground">{formatUTCDate(device.bootTime)}</span></div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Shield className="size-4 text-[#10b981]" /> Security Status
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Antivirus</span>
              <Badge className={device.antivirus ? "bg-[#10b981]/15 text-[#10b981] border-[#10b981]/30 hover:bg-[#10b981]/15" : "bg-[#ef4444]/15 text-[#ef4444] border-[#ef4444]/30 hover:bg-[#ef4444]/15"}>
                {device.antivirus ? "Active" : "Disabled"}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Firewall</span>
              <Badge className={device.firewall ? "bg-[#10b981]/15 text-[#10b981] border-[#10b981]/30 hover:bg-[#10b981]/15" : "bg-[#ef4444]/15 text-[#ef4444] border-[#ef4444]/30 hover:bg-[#ef4444]/15"}>
                {device.firewall ? "Enabled" : "Disabled"}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Risk Level</span>
              <span className="font-bold" style={{ color: riskColor }}>{device.riskLevel}/100</span>
            </div>
            <Progress value={device.riskLevel} className="h-2" />
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-foreground">
              <AlertTriangle className="size-4 text-[#f59e0b]" /> Risk Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Failed Logins</span><span className="text-foreground">{deviceLogins.filter(l => !l.success).length}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Critical Alerts</span><span className="text-foreground">{deviceAlerts.filter(a => a.severity === "critical").length}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Suspicious Ports</span><span className="text-foreground">{devicePorts.filter(p => p.suspicious).length}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">USB Insertions</span><span className="text-foreground">{deviceUSB.length}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Driver Changes</span><span className="text-foreground">{deviceDrivers.filter(d => d.newlyAdded).length}</span></div>
          </CardContent>
        </Card>
      </div>

      {/* Tabbed Detail Sections */}
      <Tabs defaultValue="logins" className="w-full">
        <TabsList className="bg-muted">
          <TabsTrigger value="logins"><LogIn className="mr-1.5 size-3" />Logins</TabsTrigger>
          <TabsTrigger value="files"><FileText className="mr-1.5 size-3" />Files</TabsTrigger>
          <TabsTrigger value="usb"><Usb className="mr-1.5 size-3" />USB</TabsTrigger>
          <TabsTrigger value="ports"><Network className="mr-1.5 size-3" />Ports</TabsTrigger>
          <TabsTrigger value="drivers"><HardDrive className="mr-1.5 size-3" />Drivers</TabsTrigger>
          <TabsTrigger value="alerts"><AlertTriangle className="mr-1.5 size-3" />Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="logins">
          <Card className="border-border bg-card">
            <CardContent className="pt-6">
              {deviceLogins.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow className="border-border">
                      <TableHead className="text-muted-foreground">User</TableHead>
                      <TableHead className="text-muted-foreground">Timestamp</TableHead>
                      <TableHead className="text-muted-foreground">Status</TableHead>
                      <TableHead className="text-muted-foreground">After Hours</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {deviceLogins.map((login, i) => (
                      <TableRow key={i} className="border-border">
                        <TableCell className="font-mono text-xs text-foreground">{login.user}</TableCell>
                        <TableCell className="text-muted-foreground text-xs">{formatUTCDate(login.timestamp)}</TableCell>
                        <TableCell>
                          <Badge className={login.success ? "bg-[#10b981]/15 text-[#10b981] border-[#10b981]/30 hover:bg-[#10b981]/15" : "bg-[#ef4444]/15 text-[#ef4444] border-[#ef4444]/30 hover:bg-[#ef4444]/15"}>
                            {login.success ? "Success" : "Failed"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {login.afterHours && <Badge className="bg-[#f59e0b]/15 text-[#f59e0b] border-[#f59e0b]/30 hover:bg-[#f59e0b]/15">After Hours</Badge>}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="py-8 text-center text-sm text-muted-foreground">No login activity recorded</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="files">
          <Card className="border-border bg-card">
            <CardContent className="pt-6">
              {deviceFiles.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow className="border-border">
                      <TableHead className="text-muted-foreground">File Path</TableHead>
                      <TableHead className="text-muted-foreground">Action</TableHead>
                      <TableHead className="text-muted-foreground">User</TableHead>
                      <TableHead className="text-muted-foreground">Timestamp</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {deviceFiles.map((file, i) => (
                      <TableRow key={i} className={`border-border ${file.critical ? "bg-[#ef4444]/5" : ""}`}>
                        <TableCell className="max-w-[300px] truncate font-mono text-xs text-foreground">{file.path}</TableCell>
                        <TableCell>
                          <Badge className={
                            file.action === "Created" ? "bg-[#10b981]/15 text-[#10b981] border-[#10b981]/30 hover:bg-[#10b981]/15" :
                            file.action === "Modified" ? "bg-[#f59e0b]/15 text-[#f59e0b] border-[#f59e0b]/30 hover:bg-[#f59e0b]/15" :
                            "bg-[#ef4444]/15 text-[#ef4444] border-[#ef4444]/30 hover:bg-[#ef4444]/15"
                          }>{file.action}</Badge>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">{file.user}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">{formatUTCDate(file.timestamp)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="py-8 text-center text-sm text-muted-foreground">No file changes recorded</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usb">
          <Card className="border-border bg-card">
            <CardContent className="pt-6">
              {deviceUSB.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow className="border-border">
                      <TableHead className="text-muted-foreground">USB Device</TableHead>
                      <TableHead className="text-muted-foreground">Timestamp</TableHead>
                      <TableHead className="text-muted-foreground">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {deviceUSB.map((usb, i) => (
                      <TableRow key={i} className="border-border">
                        <TableCell className="text-xs text-foreground">{usb.usbName}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">{formatUTCDate(usb.timestamp)}</TableCell>
                        <TableCell>
                          <Badge className={usb.known ? "bg-[#10b981]/15 text-[#10b981] border-[#10b981]/30 hover:bg-[#10b981]/15" : "bg-[#ef4444]/15 text-[#ef4444] border-[#ef4444]/30 hover:bg-[#ef4444]/15"}>
                            {usb.known ? "Known" : "Unknown"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="py-8 text-center text-sm text-muted-foreground">No USB devices recorded</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ports">
          <Card className="border-border bg-card">
            <CardContent className="pt-6">
              {devicePorts.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow className="border-border">
                      <TableHead className="text-muted-foreground">Port</TableHead>
                      <TableHead className="text-muted-foreground">Service</TableHead>
                      <TableHead className="text-muted-foreground">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {devicePorts.map((port, i) => (
                      <TableRow key={i} className={`border-border ${port.suspicious ? "bg-[#ef4444]/5" : ""}`}>
                        <TableCell className="font-mono text-xs text-foreground">{port.port}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">{port.service}</TableCell>
                        <TableCell>
                          <Badge className={port.suspicious ? "bg-[#ef4444]/15 text-[#ef4444] border-[#ef4444]/30 hover:bg-[#ef4444]/15" : "bg-[#10b981]/15 text-[#10b981] border-[#10b981]/30 hover:bg-[#10b981]/15"}>
                            {port.suspicious ? "Suspicious" : "Normal"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="py-8 text-center text-sm text-muted-foreground">No open ports recorded</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="drivers">
          <Card className="border-border bg-card">
            <CardContent className="pt-6">
              {deviceDrivers.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow className="border-border">
                      <TableHead className="text-muted-foreground">Driver Name</TableHead>
                      <TableHead className="text-muted-foreground">Version</TableHead>
                      <TableHead className="text-muted-foreground">Date</TableHead>
                      <TableHead className="text-muted-foreground">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {deviceDrivers.map((driver, i) => (
                      <TableRow key={i} className={`border-border ${driver.newlyAdded ? "bg-[#f59e0b]/5" : ""}`}>
                        <TableCell className="text-xs text-foreground">{driver.name}</TableCell>
                        <TableCell className="font-mono text-xs text-muted-foreground">{driver.version}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">{driver.date}</TableCell>
                        <TableCell>
                          {driver.newlyAdded && <Badge className="bg-[#f59e0b]/15 text-[#f59e0b] border-[#f59e0b]/30 hover:bg-[#f59e0b]/15">New</Badge>}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="py-8 text-center text-sm text-muted-foreground">No drivers recorded</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts">
          <Card className="border-border bg-card">
            <CardContent className="pt-6">
              {deviceAlerts.length > 0 ? (
                <ScrollArea className="h-[400px]">
                  <div className="flex flex-col gap-3 pr-4">
                    {deviceAlerts.map((alert) => (
                      <div key={alert.id} className="rounded-lg border border-border bg-secondary p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">{formatUTCDate}</span>
                          <Badge className={
                            alert.severity === "critical" ? "bg-[#ef4444]/15 text-[#ef4444] border-[#ef4444]/30 hover:bg-[#ef4444]/15" :
                            alert.severity === "high" ? "bg-[#f59e0b]/15 text-[#f59e0b] border-[#f59e0b]/30 hover:bg-[#f59e0b]/15" :
                            alert.severity === "medium" ? "bg-[#3b82f6]/15 text-primary border-[#3b82f6]/30 hover:bg-[#3b82f6]/15" :
                            "bg-[#64748b]/15 text-[#94a3b8] border-[#64748b]/30 hover:bg-[#64748b]/15"
                          }>{alert.severity}</Badge>
                        </div>
                        <p className="mt-2 text-sm font-medium text-foreground">{alert.type}</p>
                        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{alert.description}</p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              ) : (
                <p className="py-8 text-center text-sm text-muted-foreground">No alerts for this device</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
