"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { UserRole } from "./role-context"

interface AuthUser {
  username: string
  role: UserRole
}

interface AuthContextValue {
  user: AuthUser | null
  login: (username: string, password: string, role: UserRole) => boolean
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextValue | null>(null)

const CREDENTIALS: Record<UserRole, { username: string; password: string }> = {
  admin: { username: "admin", password: "admin123" },
  limited: { username: "user", password: "user123" },
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)

  const login = (username: string, password: string, role: UserRole): boolean => {
    const creds = CREDENTIALS[role]
    if (username === creds.username && password === creds.password) {
      setUser({ username, role })
      return true
    }
    return false
  }

  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
