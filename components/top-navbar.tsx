"use client"

import { useRole } from "@/lib/role-context"
import { useInstitution } from "@/lib/institution-context"
import { InstitutionManager } from "@/components/institution-manager"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, Menu, Moon, Sun, User, Shield, ShieldAlert } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function TopNavbar({ onMenuClick }: { onMenuClick: () => void }) {
  const { role, setRole, isAdmin } = useRole()
  const { institutionName } = useInstitution()
  const { theme, setTheme } = useTheme()

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-cyan-500/10 bg-gradient-to-r from-slate-900/95 via-slate-900/95 to-slate-900/95 px-4 backdrop-blur-xl md:px-6 shadow-lg shadow-cyan-500/5">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="rounded-md p-2 text-muted-foreground hover:text-foreground lg:hidden transition-colors"
          aria-label="Toggle sidebar"
        >
          <Menu className="size-5" />
        </button>
        <div className="hidden items-center gap-4 sm:flex">
          <div className="flex flex-col">
            <h1 className="text-sm font-semibold text-foreground">{institutionName}</h1>
            <p className="text-[10px] text-muted-foreground">Cybersecurity Monitor</p>
          </div>
          <div className="h-6 w-px bg-cyan-500/20" />
          <InstitutionManager />
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Notification Bell */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative text-muted-foreground hover:text-cyan-400 hover:bg-cyan-500/10 transition-all"
        >
          <Bell className="size-4" />
          <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-600 text-[9px] font-bold text-white shadow-lg shadow-red-500/40">
            3
          </span>
          <span className="sr-only">Notifications</span>
        </Button>

        {/* Risk Badge */}
        <Badge className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30 hover:from-amber-500/30 hover:to-orange-500/30 shadow-lg shadow-amber-500/10">
          Risk: 58/100
        </Badge>

        {/* Role Badge */}
        <Badge
          className={
            isAdmin
              ? "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400 border-blue-500/30 hover:from-blue-500/30 hover:to-cyan-500/30 cursor-pointer shadow-lg shadow-blue-500/10 transition-all"
              : "bg-gradient-to-r from-emerald-500/20 to-green-500/20 text-emerald-400 border-emerald-500/30 hover:from-emerald-500/30 hover:to-green-500/30 cursor-pointer shadow-lg shadow-emerald-500/10 transition-all"
          }
          onClick={() => setRole(isAdmin ? "limited" : "admin")}
        >
          {isAdmin ? (
            <><Shield className="size-3" /> Admin</>
          ) : (
            <><ShieldAlert className="size-3" /> Limited</>
          )}
        </Badge>

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-cyan-400 hover:bg-cyan-500/10 transition-all"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <Sun className="size-4 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute size-4 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-muted-foreground hover:text-cyan-400 hover:bg-cyan-500/10 transition-all"
            >
              <User className="size-4" />
              <span className="sr-only">User menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 border-cyan-500/20 bg-slate-900/95 backdrop-blur">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-cyan-500/10" />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Preferences</DropdownMenuItem>
            <DropdownMenuSeparator className="bg-cyan-500/10" />
            <DropdownMenuItem onClick={() => setRole(isAdmin ? "limited" : "admin")}>
              Switch to {isAdmin ? "Limited" : "Admin"} View
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-cyan-500/10" />
            <DropdownMenuItem className="text-red-500 focus:text-red-400 focus:bg-red-500/10">Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
