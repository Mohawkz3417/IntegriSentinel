"use client"

import { useRole } from "@/lib/role-context"
import { useInstitution } from "@/lib/institution-context"
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
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-[#0f172a]/95 px-4 backdrop-blur-sm md:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-md p-2 text-muted-foreground hover:text-foreground lg:hidden"
          aria-label="Toggle sidebar"
        >
          <Menu className="size-5" />
        </button>
        <div className="hidden items-center gap-3 sm:flex">
          <h1 className="text-sm font-semibold text-foreground">{institutionName}</h1>
          <Badge className="bg-[#f59e0b]/15 text-[#f59e0b] border-[#f59e0b]/30 hover:bg-[#f59e0b]/15">
            Risk: 58/100
          </Badge>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Notification Bell */}
        <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
          <Bell className="size-4" />
          <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-[#ef4444] text-[9px] font-bold text-[#ffffff]">
            3
          </span>
          <span className="sr-only">Notifications</span>
        </Button>

        {/* Role Badge */}
        <Badge
          className={
            isAdmin
              ? "bg-[#3b82f6]/15 text-[#3b82f6] border-[#3b82f6]/30 hover:bg-[#3b82f6]/15 cursor-pointer"
              : "bg-[#10b981]/15 text-[#10b981] border-[#10b981]/30 hover:bg-[#10b981]/15 cursor-pointer"
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
          className="text-muted-foreground hover:text-foreground"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <Sun className="size-4 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute size-4 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <User className="size-4" />
              <span className="sr-only">User menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Preferences</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setRole(isAdmin ? "limited" : "admin")}>
              Switch to {isAdmin ? "Limited" : "Admin"} View
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-[#ef4444]">Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
