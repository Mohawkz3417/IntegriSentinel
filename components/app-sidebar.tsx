"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useRole } from "@/lib/role-context"
import { useInstitution } from "@/lib/institution-context"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  LayoutDashboard, Monitor, AlertTriangle, ShieldAlert, FileText,
  LogIn, Network, HardDrive, Search, Database, Settings, TrendingUp,
  Building2, Shield, Sliders, X, ChevronDown, ChevronRight, MapPin,
} from "lucide-react"
import { useState } from "react"

interface NavItem {
  label: string
  href: string
  icon: React.ElementType
  adminOnly?: boolean
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Devices", href: "/dashboard/devices", icon: Monitor },
  { label: "Alerts", href: "/dashboard/alerts", icon: AlertTriangle },
  { label: "Critical Alerts", href: "/dashboard/critical-alerts", icon: ShieldAlert },
  { label: "File Integrity", href: "/dashboard/file-integrity", icon: FileText },
  { label: "Login Analytics", href: "/dashboard/login-analytics", icon: LogIn },
  { label: "Network & Ports", href: "/dashboard/network", icon: Network },
  { label: "Drivers & OS", href: "/dashboard/drivers", icon: HardDrive },
  { label: "Malicious Hash", href: "/dashboard/malicious-hash", icon: Search, adminOnly: true },
  { label: "Database Logs", href: "/dashboard/database-logs", icon: Database, adminOnly: true },
  { label: "Policies", href: "/dashboard/monitoring-policies", icon: Sliders, adminOnly: true },
  { label: "Risk Intel", href: "/dashboard/risk-intelligence", icon: TrendingUp },
  { label: "Institution", href: "/dashboard/institution", icon: Building2 },
  { label: "Settings", href: "/dashboard/settings", icon: Settings, adminOnly: true },
]

export function AppSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname()
  const { isAdmin } = useRole()
  const { institutionName, entities } = useInstitution()
  const [instExpanded, setInstExpanded] = useState(true)
  const filteredItems = navItems.filter((item) => !item.adminOnly || isAdmin)

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 flex h-full w-64 flex-col border-r border-[#1a2540] bg-[#080e1c] transition-transform duration-300 lg:static lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-[#1a2540] px-5">
          <div className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-lg bg-[#00d4ff]/10">
              <Shield className="size-4.5 text-[#00d4ff]" />
            </div>
            <div>
              <span className="text-sm font-bold tracking-wide text-[#e8edf5]">DIIMS</span>
              <span className="ml-1.5 text-[10px] font-medium text-[#00d4ff]">v2.0</span>
            </div>
          </div>
          <button onClick={onClose} className="rounded-md p-1 text-[#7a8baa] hover:text-[#e8edf5] lg:hidden" aria-label="Close sidebar">
            <X className="size-5" />
          </button>
        </div>

        {/* Institution Drill-Down */}
        <div className="border-b border-[#1a2540] px-3 py-3">
          <button
            onClick={() => setInstExpanded(!instExpanded)}
            className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left transition-colors hover:bg-[#141d2f]"
          >
            <div className="flex size-7 items-center justify-center rounded-md bg-[#7c5cff]/10">
              <Building2 className="size-3.5 text-[#7c5cff]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-xs font-semibold text-[#e8edf5]">{institutionName}</p>
              <p className="text-[10px] text-[#7a8baa]">{entities.length} entities</p>
            </div>
            {instExpanded ? <ChevronDown className="size-3.5 text-[#7a8baa]" /> : <ChevronRight className="size-3.5 text-[#7a8baa]" />}
          </button>
          {instExpanded && (
            <div className="mt-1 flex flex-col gap-0.5 pl-3 animate-slide-up">
              {entities.slice(0, 8).map((entity) => (
                <Link
                  key={entity.id}
                  href={`/dashboard/devices?entity=${encodeURIComponent(entity.name)}`}
                  onClick={onClose}
                  className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs text-[#7a8baa] transition-colors hover:bg-[#141d2f] hover:text-[#e8edf5]"
                >
                  <MapPin className="size-3 text-[#7a8baa]/60" />
                  <span className="truncate">{entity.name}</span>
                  <span className="ml-auto text-[10px] text-[#3d4f6f]">{entity.type}</span>
                </Link>
              ))}
              {entities.length > 8 && (
                <Link
                  href="/dashboard/institution"
                  onClick={onClose}
                  className="px-2 py-1 text-[10px] font-medium text-[#00d4ff] hover:underline"
                >
                  View all {entities.length} entities
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 py-3">
          <nav className="flex flex-col gap-0.5 px-3">
            {filteredItems.map((item) => {
              const isActive = item.href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium transition-all duration-200",
                    isActive
                      ? "bg-[#00d4ff]/10 text-[#00d4ff] shadow-sm shadow-[#00d4ff]/5"
                      : "text-[#7a8baa] hover:bg-[#141d2f] hover:text-[#e8edf5]"
                  )}
                >
                  <item.icon className={cn("size-4 shrink-0", isActive && "drop-shadow-[0_0_4px_rgba(0,212,255,0.5)]")} />
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </ScrollArea>

        {/* Status bar */}
        <div className="border-t border-[#1a2540] p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-[#7a8baa]">
              <div className="size-2 rounded-full bg-[#00ffaa] shadow-[0_0_6px_rgba(0,255,170,0.5)]" />
              <span>System Online</span>
            </div>
            <span className="text-[10px] font-mono text-[#3d4f6f]">12 Hosts</span>
          </div>
        </div>
      </aside>
    </>
  )
}
