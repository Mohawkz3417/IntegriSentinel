"use client"

import { useRole } from "@/lib/role-context"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { mockDevices, mockAlerts } from "@/lib/mock-data"
import { Users, Settings, Shield, TrendingUp, AlertTriangle, BarChart3, Lock, Eye } from "lucide-react"

export default function AdminDashboard() {
  const { isAdmin } = useRole()

  if (!isAdmin) {
    redirect("/dashboard")
  }

  const totalUsers = 48
  const activeNow = 12
  const suspiciousActivities = mockAlerts.filter(a => a.severity === "critical").length

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-start gap-4 rounded-lg border border-cyan-500/20 bg-gradient-to-r from-slate-900/50 to-slate-800/30 p-6">
        <div className="flex size-12 items-center justify-center rounded-lg border border-cyan-500/30 bg-gradient-to-br from-cyan-500/20 to-cyan-500/10 shadow-lg shadow-cyan-500/10">
          <Shield className="size-6 text-cyan-400" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
            Administrator Dashboard
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            System-wide monitoring, user management, and security policies
          </p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="group border-cyan-500/20 bg-gradient-to-br from-slate-900/50 to-slate-800/30 hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/20 transition-all overflow-hidden animate-bounce-in">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 group-hover:via-cyan-500/10 transition-all" />
          <CardContent className="pt-6 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold text-cyan-400 mt-1">{totalUsers}</p>
              </div>
              <Users className="size-8 text-cyan-500/20 group-hover:text-cyan-500/40 transition-colors" />
            </div>
          </CardContent>
        </Card>

        <Card className="group border-emerald-500/20 bg-gradient-to-br from-slate-900/50 to-slate-800/30 hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/20 transition-all overflow-hidden animate-bounce-in" style={{ animationDelay: "50ms" }}>
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 group-hover:via-emerald-500/10 transition-all" />
          <CardContent className="pt-6 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Online Now</p>
                <p className="text-2xl font-bold text-emerald-400 mt-1">{activeNow}</p>
              </div>
              <Eye className="size-8 text-emerald-500/20 group-hover:text-emerald-500/40 transition-colors" />
            </div>
          </CardContent>
        </Card>

        <Card className="group border-red-500/20 bg-gradient-to-br from-slate-900/50 to-slate-800/30 hover:border-red-500/40 hover:shadow-lg hover:shadow-red-500/20 transition-all overflow-hidden animate-bounce-in" style={{ animationDelay: "100ms" }}>
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/5 to-red-500/0 group-hover:via-red-500/10 transition-all" />
          <CardContent className="pt-6 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Critical Alerts</p>
                <p className="text-2xl font-bold text-red-400 mt-1">{suspiciousActivities}</p>
              </div>
              <AlertTriangle className="size-8 text-red-500/20 group-hover:text-red-500/40 transition-colors" />
            </div>
          </CardContent>
        </Card>

        <Card className="group border-cyan-500/20 bg-gradient-to-br from-slate-900/50 to-slate-800/30 hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/20 transition-all overflow-hidden animate-bounce-in" style={{ animationDelay: "150ms" }}>
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 group-hover:via-cyan-500/10 transition-all" />
          <CardContent className="pt-6 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Total Devices</p>
                <p className="text-2xl font-bold text-cyan-400 mt-1">{mockDevices.length}</p>
              </div>
              <BarChart3 className="size-8 text-cyan-500/20 group-hover:text-cyan-500/40 transition-colors" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Admin Functions Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* User Management */}
        <Card className="border-cyan-500/20 bg-gradient-to-br from-slate-900/50 to-slate-800/30 overflow-hidden hover:border-cyan-500/40 transition-all group">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 group-hover:via-cyan-500/10 transition-all" />
          <CardHeader className="border-b border-cyan-500/10 pb-4 relative z-10">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Users className="size-5 text-cyan-500" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">User Management</span>
            </CardTitle>
            <CardDescription>Manage users, roles, and permissions</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-3 relative z-10">
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 rounded-lg border border-cyan-500/10 bg-slate-900/30 hover:bg-slate-900/60 transition-colors group/item">
                <span className="text-sm font-medium text-foreground">Active Users</span>
                <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">{totalUsers}</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-cyan-500/10 bg-slate-900/30 hover:bg-slate-900/60 transition-colors group/item">
                <span className="text-sm font-medium text-foreground">Pending Invites</span>
                <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30">5</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-cyan-500/10 bg-slate-900/30 hover:bg-slate-900/60 transition-colors group/item">
                <span className="text-sm font-medium text-foreground">Suspended Accounts</span>
                <Badge className="bg-red-500/20 text-red-300 border-red-500/30">2</Badge>
              </div>
            </div>
            <Button className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white">
              Manage Users
            </Button>
          </CardContent>
        </Card>

        {/* Security Policies */}
        <Card className="border-emerald-500/20 bg-gradient-to-br from-slate-900/50 to-slate-800/30 overflow-hidden hover:border-emerald-500/40 transition-all group">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 group-hover:via-emerald-500/10 transition-all" />
          <CardHeader className="border-b border-emerald-500/10 pb-4 relative z-10">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Lock className="size-5 text-emerald-500" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Security Policies</span>
            </CardTitle>
            <CardDescription>Manage security standards and compliance</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-3 relative z-10">
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 rounded-lg border border-emerald-500/10 bg-slate-900/30 hover:bg-slate-900/60 transition-colors">
                <span className="text-sm font-medium text-foreground">Active Policies</span>
                <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">8</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-emerald-500/10 bg-slate-900/30 hover:bg-slate-900/60 transition-colors">
                <span className="text-sm font-medium text-foreground">Compliance Level</span>
                <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">92%</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-emerald-500/10 bg-slate-900/30 hover:bg-slate-900/60 transition-colors">
                <span className="text-sm font-medium text-foreground">Policy Updates</span>
                <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30">3 pending</Badge>
              </div>
            </div>
            <Button className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white">
              Manage Policies
            </Button>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card className="border-cyan-500/20 bg-gradient-to-br from-slate-900/50 to-slate-800/30 overflow-hidden hover:border-cyan-500/40 transition-all group">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 group-hover:via-cyan-500/10 transition-all" />
          <CardHeader className="border-b border-cyan-500/10 pb-4 relative z-10">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Settings className="size-5 text-cyan-500" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">System Configuration</span>
            </CardTitle>
            <CardDescription>Configure system-wide settings and parameters</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-3 relative z-10">
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 rounded-lg border border-cyan-500/10 bg-slate-900/30 hover:bg-slate-900/60 transition-colors">
                <span className="text-sm font-medium text-foreground">Email Service</span>
                <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-xs">Connected</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-cyan-500/10 bg-slate-900/30 hover:bg-slate-900/60 transition-colors">
                <span className="text-sm font-medium text-foreground">Backup Status</span>
                <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-xs">Running</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-cyan-500/10 bg-slate-900/30 hover:bg-slate-900/60 transition-colors">
                <span className="text-sm font-medium text-foreground">API Rate Limit</span>
                <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 text-xs">1000/hr</Badge>
              </div>
            </div>
            <Button className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white">
              System Settings
            </Button>
          </CardContent>
        </Card>

        {/* Audit Logging */}
        <Card className="border-amber-500/20 bg-gradient-to-br from-slate-900/50 to-slate-800/30 overflow-hidden hover:border-amber-500/40 transition-all group">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/5 to-amber-500/0 group-hover:via-amber-500/10 transition-all" />
          <CardHeader className="border-b border-amber-500/10 pb-4 relative z-10">
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="size-5 text-amber-500" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Audit Logging</span>
            </CardTitle>
            <CardDescription>Monitor admin activities and system changes</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-3 relative z-10">
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 rounded-lg border border-amber-500/10 bg-slate-900/30 hover:bg-slate-900/60 transition-colors">
                <span className="text-sm font-medium text-foreground">Logs This Month</span>
                <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">2,847</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-amber-500/10 bg-slate-900/30 hover:bg-slate-900/60 transition-colors">
                <span className="text-sm font-medium text-foreground">Suspicious Actions</span>
                <Badge className="bg-red-500/20 text-red-300 border-red-500/30">12</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-amber-500/10 bg-slate-900/30 hover:bg-slate-900/60 transition-colors">
                <span className="text-sm font-medium text-foreground">Database Size</span>
                <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30">4.2 GB</Badge>
              </div>
            </div>
            <Button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white">
              View Audit Logs
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-cyan-500/20 bg-gradient-to-br from-slate-900/50 to-slate-800/30">
        <CardHeader className="border-b border-cyan-500/10">
          <CardTitle className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
            Quick Administration Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              { label: "Add User", icon: "👤" },
              { label: "Create Policy", icon: "📋" },
              { label: "Generate Report", icon: "📊" },
              { label: "View Backups", icon: "💾" },
            ].map((action) => (
              <Button
                key={action.label}
                variant="outline"
                className="border-cyan-500/20 hover:bg-cyan-500/10 hover:border-cyan-500/40 transition-all"
              >
                <span className="mr-2">{action.icon}</span>
                {action.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
