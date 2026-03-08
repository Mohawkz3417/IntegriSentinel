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
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background dark:bg-gradient-to-r dark:from-slate-900/95 dark:via-slate-900/95 dark:to-slate-900/95 px-4 backdrop-blur-xl md:px-6 shadow-sm dark:shadow-lg dark:shadow-cyan-500/5">
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
          <div className="h-6 w-px bg-border dark:bg-cyan-500/20" />
          <InstitutionManager />
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Notification Bell */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative text-muted-foreground hover:text-primary dark:hover:text-cyan-400 hover:bg-secondary dark:hover:bg-cyan-500/10 transition-all"
        >
          <Bell className="size-4" />
          <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-red-500 dark:bg-gradient-to-br dark:from-red-500 dark:to-red-600 text-[9px] font-bold text-white shadow-lg shadow-red-500/40">
            3
          </span>
          <span className="sr-only">Notifications</span>
        </Button>

        {/* Risk Badge */}
        <Badge className="dark:bg-gradient-to-r dark:from-amber-500/20 dark:to-orange-500/20 dark:text-amber-400 dark:border-amber-500/30 bg-amber-50 text-amber-700 border-amber-200 dark:hover:from-amber-500/30 dark:hover:to-orange-500/30 dark:shadow-lg dark:shadow-amber-500/10">
          Risk: 58/100
        </Badge>

        {/* Role Badge */}
        <Badge
          className={
            isAdmin
              ? "dark:bg-gradient-to-r dark:from-blue-500/20 dark:to-cyan-500/20 dark:text-blue-400 dark:border-blue-500/30 dark:hover:from-blue-500/30 dark:hover:to-cyan-500/30 dark:shadow-lg dark:shadow-blue-500/10 bg-blue-50 text-blue-700 border-blue-200 cursor-pointer transition-all"
              : "dark:bg-gradient-to-r dark:from-emerald-500/20 dark:to-green-500/20 dark:text-emerald-400 dark:border-emerald-500/30 dark:hover:from-emerald-500/30 dark:hover:to-green-500/30 dark:shadow-lg dark:shadow-emerald-500/10 bg-emerald-50 text-emerald-700 border-emerald-200 cursor-pointer transition-all"
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
          className="text-muted-foreground hover:text-primary dark:hover:text-cyan-400 hover:bg-secondary dark:hover:bg-cyan-500/10 transition-all"
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
              className="text-muted-foreground hover:text-primary dark:hover:text-cyan-400 hover:bg-secondary dark:hover:bg-cyan-500/10 transition-all"
            >
              <User className="size-4" />
              <span className="sr-only">User menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 dark:border-cyan-500/20 dark:bg-slate-900/95 backdrop-blur">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="dark:bg-cyan-500/10" />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Preferences</DropdownMenuItem>
            <DropdownMenuSeparator className="dark:bg-cyan-500/10" />
            <DropdownMenuItem onClick={() => setRole(isAdmin ? "limited" : "admin")}>
              Switch to {isAdmin ? "Limited" : "Admin"} View
            </DropdownMenuItem>
            <DropdownMenuSeparator className="dark:bg-cyan-500/10" />
            <DropdownMenuItem className="text-destructive dark:text-red-500 dark:focus:text-red-400 dark:focus:bg-red-500/10">Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
