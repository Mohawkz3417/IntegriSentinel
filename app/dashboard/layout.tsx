"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { TopNavbar } from "@/components/top-navbar"
import { DemoModeBanner } from "@/components/demo-mode-banner"
import { RoleProvider } from "@/lib/role-context"
import { InstitutionProvider } from "@/lib/institution-context"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleProvider>
      <InstitutionProvider>
        <DashboardShell>{children}</DashboardShell>
      </InstitutionProvider>
    </RoleProvider>
  )
}

function DashboardShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AppSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DemoModeBanner />
        <TopNavbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
