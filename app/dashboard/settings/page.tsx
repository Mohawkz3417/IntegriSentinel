"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRole } from "@/lib/role-context"
import { useInstitution } from "@/lib/institution-context"
import { redirect } from "next/navigation"
import { Settings as SettingsIcon, Server, Building2, User, RefreshCw, Palette } from "lucide-react"
import { useTheme } from "next-themes"

export default function SettingsPage() {
  const { isAdmin } = useRole()
  const { institutionName, setInstitutionName } = useInstitution()
  const { theme, setTheme } = useTheme()
  const [serverIp, setServerIp] = useState("192.168.1.1")
  const [serverPort, setServerPort] = useState("5000")
  const [adminName, setAdminName] = useState("System Administrator")
  const [adminEmail, setAdminEmail] = useState("admin@nit.edu")
  const [refreshInterval, setRefreshInterval] = useState("30")
  const [autoSync, setAutoSync] = useState(true)
  const [notifications, setNotifications] = useState(true)
  const [emailAlerts, setEmailAlerts] = useState(false)
  const [saved, setSaved] = useState(false)

  if (!isAdmin) {
    redirect("/dashboard")
  }

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-lg bg-[#3b82f6]/15">
          <SettingsIcon className="size-5 text-[#3b82f6]" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">Settings</h2>
          <p className="text-sm text-muted-foreground">
            System configuration and preferences
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Server Configuration */}
        <Card className="border-border bg-[#111827]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Server className="size-4 text-[#3b82f6]" />
              Server Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div>
              <label className="mb-1.5 block text-xs text-muted-foreground">Server IP Address</label>
              <Input
                value={serverIp}
                onChange={(e) => setServerIp(e.target.value)}
                className="border-border bg-[#0a0e1a] font-mono text-sm text-foreground"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs text-muted-foreground">Server Port</label>
              <Input
                value={serverPort}
                onChange={(e) => setServerPort(e.target.value)}
                className="border-border bg-[#0a0e1a] font-mono text-sm text-foreground"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs text-muted-foreground">Data Refresh Interval (seconds)</label>
              <Select value={refreshInterval} onValueChange={setRefreshInterval}>
                <SelectTrigger className="border-border bg-[#0a0e1a] text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 seconds</SelectItem>
                  <SelectItem value="30">30 seconds</SelectItem>
                  <SelectItem value="60">1 minute</SelectItem>
                  <SelectItem value="300">5 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground">Auto Sync</p>
                <p className="text-xs text-muted-foreground">Automatically sync data with agents</p>
              </div>
              <Switch checked={autoSync} onCheckedChange={setAutoSync} />
            </div>
          </CardContent>
        </Card>

        {/* Institution Settings */}
        <Card className="border-border bg-[#111827]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Building2 className="size-4 text-[#3b82f6]" />
              Institution Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div>
              <label className="mb-1.5 block text-xs text-muted-foreground">Institution Name</label>
              <Input
                value={institutionName}
                onChange={(e) => setInstitutionName(e.target.value)}
                className="border-border bg-[#0a0e1a] text-sm text-foreground"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs text-muted-foreground">SDG Alignment</label>
              <Input
                value="SDG 11 - Sustainable Cities and Communities"
                disabled
                className="border-border bg-[#0a0e1a] text-sm text-muted-foreground"
              />
            </div>
          </CardContent>
        </Card>

        {/* Admin Profile */}
        <Card className="border-border bg-[#111827]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-foreground">
              <User className="size-4 text-[#3b82f6]" />
              Admin Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div>
              <label className="mb-1.5 block text-xs text-muted-foreground">Full Name</label>
              <Input
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
                className="border-border bg-[#0a0e1a] text-sm text-foreground"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs text-muted-foreground">Email</label>
              <Input
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="border-border bg-[#0a0e1a] text-sm text-foreground"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground">Push Notifications</p>
                <p className="text-xs text-muted-foreground">Receive in-browser alerts</p>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground">Email Alerts</p>
                <p className="text-xs text-muted-foreground">Receive critical alerts via email</p>
              </div>
              <Switch checked={emailAlerts} onCheckedChange={setEmailAlerts} />
            </div>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card className="border-border bg-[#111827]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Palette className="size-4 text-[#3b82f6]" />
              Appearance
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div>
              <label className="mb-1.5 block text-xs text-muted-foreground">Theme</label>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger className="border-border bg-[#0a0e1a] text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="rounded-lg border border-border bg-[#0a0e1a] p-4">
              <p className="text-xs text-muted-foreground leading-relaxed">
                The dark theme is recommended for monitoring dashboards as it reduces eye strain during
                extended monitoring sessions and improves readability of data visualizations.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Save Button */}
      <div className="flex items-center gap-3">
        <Button onClick={handleSave} className="bg-[#3b82f6] text-[#ffffff] hover:bg-[#2563eb]">
          {saved ? (
            <>
              <RefreshCw className="mr-1.5 size-4" />
              Saved
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
        {saved && (
          <span className="text-sm text-[#10b981]">Settings saved successfully</span>
        )}
      </div>
    </div>
  )
}
