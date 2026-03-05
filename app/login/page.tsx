"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield, Eye, EyeOff, Lock, User, ShieldAlert } from "lucide-react"
import type { UserRole } from "@/lib/role-context"

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<UserRole>("admin")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    const success = login(username, password, selectedRole)
    if (success) {
      router.push("/dashboard")
    } else {
      setError("Invalid credentials. Check the hints below.")
    }
    setIsLoading(false)
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#060a13]">
      {/* Background grid pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,212,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.3) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      {/* Glow orbs */}
      <div className="pointer-events-none absolute -top-40 -left-40 size-[500px] rounded-full bg-[#00d4ff]/5 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 -bottom-40 size-[500px] rounded-full bg-[#7c5cff]/5 blur-[120px]" />

      <div className="relative z-10 w-full max-w-md px-4 animate-scale-in">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center gap-3">
          <div className="flex size-16 items-center justify-center rounded-2xl border border-[#1a2540] bg-[#0c1222] shadow-lg shadow-[#00d4ff]/10">
            <Shield className="size-8 text-[#00d4ff]" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight text-[#e8edf5]">DIIMS</h1>
            <p className="text-sm text-[#7a8baa]">Digital Infrastructure Integrity Monitoring</p>
          </div>
        </div>

        <Card className="border-[#1a2540] bg-[#0c1222]/80 backdrop-blur-xl">
          <CardHeader className="pb-4">
            {/* Role Tabs */}
            <div className="flex rounded-xl bg-[#060a13] p-1">
              <button
                type="button"
                onClick={() => { setSelectedRole("admin"); setError("") }}
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
                  selectedRole === "admin"
                    ? "bg-[#00d4ff]/10 text-[#00d4ff] shadow-sm shadow-[#00d4ff]/10"
                    : "text-[#7a8baa] hover:text-[#e8edf5]"
                }`}
              >
                <Shield className="size-4" />
                Administrator
              </button>
              <button
                type="button"
                onClick={() => { setSelectedRole("limited"); setError("") }}
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
                  selectedRole === "limited"
                    ? "bg-[#00ffaa]/10 text-[#00ffaa] shadow-sm shadow-[#00ffaa]/10"
                    : "text-[#7a8baa] hover:text-[#e8edf5]"
                }`}
              >
                <ShieldAlert className="size-4" />
                Normal User
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <Label htmlFor="username" className="text-sm text-[#7a8baa]">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#7a8baa]" />
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={selectedRole === "admin" ? "admin" : "user"}
                    className="border-[#1a2540] bg-[#060a13] pl-10 text-[#e8edf5] placeholder:text-[#3d4f6f] focus-visible:ring-[#00d4ff]/40"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="password" className="text-sm text-[#7a8baa]">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#7a8baa]" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="border-[#1a2540] bg-[#060a13] pl-10 pr-10 text-[#e8edf5] placeholder:text-[#3d4f6f] focus-visible:ring-[#00d4ff]/40"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7a8baa] hover:text-[#e8edf5] transition-colors"
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="rounded-lg border border-[#ff3b5c]/20 bg-[#ff3b5c]/10 px-3 py-2 text-sm text-[#ff3b5c] animate-scale-in">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className={`w-full font-semibold transition-all duration-300 ${
                  selectedRole === "admin"
                    ? "bg-[#00d4ff] text-[#060a13] hover:bg-[#00d4ff]/90 shadow-lg shadow-[#00d4ff]/20"
                    : "bg-[#00ffaa] text-[#060a13] hover:bg-[#00ffaa]/90 shadow-lg shadow-[#00ffaa]/20"
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="size-4 rounded-full border-2 border-[#060a13] border-t-transparent animate-spin" />
                    Authenticating...
                  </div>
                ) : (
                  `Sign in as ${selectedRole === "admin" ? "Administrator" : "Normal User"}`
                )}
              </Button>
            </form>

            {/* Credential hints */}
            <div className="mt-6 rounded-lg border border-[#1a2540] bg-[#060a13] p-3">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#7a8baa]">Demo Credentials</p>
              <div className="flex flex-col gap-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#7a8baa]">Admin</span>
                  <span className="font-mono text-[#00d4ff]">admin / admin123</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#7a8baa]">User</span>
                  <span className="font-mono text-[#00ffaa]">user / user123</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-xs text-[#3d4f6f]">
          Secured by DIIMS Enterprise Security Platform
        </p>
      </div>
    </div>
  )
}
