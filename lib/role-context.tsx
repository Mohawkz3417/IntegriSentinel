"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type UserRole = "admin" | "limited"

interface RoleContextType {
  role: UserRole
  setRole: (role: UserRole) => void
  isAdmin: boolean
}

const RoleContext = createContext<RoleContextType | undefined>(undefined)

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole>("admin")

  return (
    <RoleContext.Provider value={{ role, setRole, isAdmin: role === "admin" }}>
      {children}
    </RoleContext.Provider>
  )
}

export function useRole() {
  const context = useContext(RoleContext)
  if (!context) throw new Error("useRole must be used within a RoleProvider")
  return context
}
