"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { mockDrivers, mockDevices } from "@/lib/mock-data"
import { HardDrive, MonitorSmartphone } from "lucide-react"

export default function DriversPage() {
  const outdatedDevices = mockDevices.filter((d) => {
    const v = d.osVersion
    return v === "20H2" || v === "21H2" || v === "22H2" || v === "20.04.6"
  })

  const newDrivers = mockDrivers.filter((d) => d.newlyAdded)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-lg bg-[#06b6d4]/15">
          <HardDrive className="size-5 text-[#06b6d4]" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">Drivers & OS Health</h2>
          <p className="text-sm text-muted-foreground">Monitor installed drivers and operating system versions</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="border-border bg-[#111827]">
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex size-10 items-center justify-center rounded-lg bg-[#3b82f6]/15">
              <HardDrive className="size-5 text-[#3b82f6]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{mockDrivers.length}</p>
              <p className="text-xs text-muted-foreground">Total Drivers Tracked</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-[#111827]">
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex size-10 items-center justify-center rounded-lg bg-[#f59e0b]/15">
              <HardDrive className="size-5 text-[#f59e0b]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{newDrivers.length}</p>
              <p className="text-xs text-muted-foreground">Newly Installed Drivers</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-[#111827]">
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex size-10 items-center justify-center rounded-lg bg-[#ef4444]/15">
              <MonitorSmartphone className="size-5 text-[#ef4444]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{outdatedDevices.length}</p>
              <p className="text-xs text-muted-foreground">Outdated OS Systems</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Drivers Table */}
      <Card className="border-border bg-[#111827]">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-foreground">Installed Drivers</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead className="text-muted-foreground">Device</TableHead>
                <TableHead className="text-muted-foreground">Driver Name</TableHead>
                <TableHead className="text-muted-foreground">Version</TableHead>
                <TableHead className="text-muted-foreground">Date</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockDrivers.map((driver, i) => (
                <TableRow key={i} className={`border-border ${driver.newlyAdded ? "bg-[#f59e0b]/5" : ""}`}>
                  <TableCell className="text-xs font-medium text-[#3b82f6]">{driver.device}</TableCell>
                  <TableCell className="text-xs text-foreground">{driver.name}</TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">{driver.version}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{driver.date}</TableCell>
                  <TableCell>
                    {driver.newlyAdded ? (
                      <Badge className="bg-[#f59e0b]/15 text-[#f59e0b] border-[#f59e0b]/30 hover:bg-[#f59e0b]/15">Newly Added</Badge>
                    ) : (
                      <Badge className="bg-[#10b981]/15 text-[#10b981] border-[#10b981]/30 hover:bg-[#10b981]/15">Stable</Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* OS Versions */}
      <Card className="border-border bg-[#111827]">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-foreground">OS Version per Device</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead className="text-muted-foreground">Device</TableHead>
                <TableHead className="text-muted-foreground">OS</TableHead>
                <TableHead className="text-muted-foreground">Version</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockDevices.map((device) => {
                const isOutdated = outdatedDevices.includes(device)
                return (
                  <TableRow key={device.id} className={`border-border ${isOutdated ? "bg-[#ef4444]/5" : ""}`}>
                    <TableCell className="text-xs font-medium text-[#3b82f6]">{device.name}</TableCell>
                    <TableCell className="text-xs text-foreground">{device.os}</TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">{device.osVersion}</TableCell>
                    <TableCell>
                      {isOutdated ? (
                        <Badge className="bg-[#ef4444]/15 text-[#ef4444] border-[#ef4444]/30 hover:bg-[#ef4444]/15">Outdated</Badge>
                      ) : (
                        <Badge className="bg-[#10b981]/15 text-[#10b981] border-[#10b981]/30 hover:bg-[#10b981]/15">Up to Date</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
