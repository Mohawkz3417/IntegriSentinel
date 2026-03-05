"use client"

import { useState } from "react"
import { useInstitution, type Institution } from "@/lib/institution-context"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, ChevronDown, Building2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function InstitutionManager() {
  const { institutions, currentInstitutionId, setCurrentInstitutionId, institutionName, addInstitution } = useInstitution()
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    location: "",
    admin: "",
    type: "Institute" as const,
    devices: 0,
  })

  const currentInst = institutions.find((i) => i.id === currentInstitutionId)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.code) {
      addInstitution({
        name: formData.name,
        code: formData.code,
        location: formData.location,
        admin: formData.admin,
        type: formData.type,
        devices: formData.devices,
      })
      setFormData({ name: "", code: "", location: "", admin: "", type: "Institute", devices: 0 })
      setOpen(false)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 border-cyan-500/30 bg-cyan-500/5 text-foreground hover:bg-cyan-500/10 hover:border-cyan-500/50 animate-fade-in"
          >
            <Building2 className="size-4" />
            <span className="hidden sm:inline text-xs">{currentInst?.code || "NIT"}</span>
            <ChevronDown className="size-3.5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          <DropdownMenuLabel>Select Institution</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {institutions.map((inst) => (
            <DropdownMenuItem
              key={inst.id}
              onClick={() => setCurrentInstitutionId(inst.id)}
              className={currentInstitutionId === inst.id ? "bg-cyan-500/10" : ""}
            >
              <div className="flex flex-col gap-0.5">
                <span className="font-medium">{inst.name}</span>
                <span className="text-[10px] text-muted-foreground">{inst.code} • {inst.devices} devices</span>
              </div>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <Plus className="size-3.5 mr-2" />
                Add New Institution
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-card border-cyan-500/20">
              <DialogHeader>
                <DialogTitle className="text-lg flex items-center gap-2">
                  <Building2 className="size-5 text-cyan-500" />
                  Add New Institution
                </DialogTitle>
                <DialogDescription>
                  Register a new institution to the IntegriSentinel monitoring system.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="name" className="text-sm">Institution Name</Label>
                    <Input
                      id="name"
                      placeholder="e.g., National Institute of Technology"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="border-cyan-500/20 focus:border-cyan-500/50 focus:ring-cyan-500/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="code" className="text-sm">Institution Code</Label>
                    <Input
                      id="code"
                      placeholder="e.g., NIT"
                      value={formData.code}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                      className="border-cyan-500/20 focus:border-cyan-500/50 focus:ring-cyan-500/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type" className="text-sm">Type</Label>
                    <Select value={formData.type} onValueChange={(val) => setFormData({ ...formData, type: val as any })}>
                      <SelectTrigger className="border-cyan-500/20 focus:border-cyan-500/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="University">University</SelectItem>
                        <SelectItem value="College">College</SelectItem>
                        <SelectItem value="School">School</SelectItem>
                        <SelectItem value="Institute">Institute</SelectItem>
                        <SelectItem value="Organization">Organization</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="location" className="text-sm">Location</Label>
                    <Input
                      id="location"
                      placeholder="e.g., Nagpur, India"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="border-cyan-500/20 focus:border-cyan-500/50 focus:ring-cyan-500/20"
                    />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="admin" className="text-sm">Administrator Name</Label>
                    <Input
                      id="admin"
                      placeholder="e.g., Dr. John Doe"
                      value={formData.admin}
                      onChange={(e) => setFormData({ ...formData, admin: e.target.value })}
                      className="border-cyan-500/20 focus:border-cyan-500/50 focus:ring-cyan-500/20"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <Button variant="outline" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white"
                  >
                    <Plus className="size-4 mr-2" />
                    Create Institution
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
