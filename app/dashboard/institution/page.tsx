"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { mockDepartments, mockDevices } from "@/lib/mock-data"
import { useInstitution } from "@/lib/institution-context"
import { Building2, Pencil, Check, X, Plus, Trash2, MapPin } from "lucide-react"

const entityTypes = ["Lab", "Office", "Facility", "Infrastructure", "Classroom", "Staff Room", "Other"]

export default function InstitutionPage() {
  const { institutionName, setInstitutionName, entities, addEntity, removeEntity, updateEntity } = useInstitution()

  const [editingName, setEditingName] = useState(false)
  const [nameInput, setNameInput] = useState(institutionName)

  const [newEntityName, setNewEntityName] = useState("")
  const [newEntityType, setNewEntityType] = useState("Lab")

  const [editingEntityId, setEditingEntityId] = useState<string | null>(null)
  const [editEntityName, setEditEntityName] = useState("")
  const [editEntityType, setEditEntityType] = useState("")

  const totalDevices = mockDevices.length
  const compliantDevices = mockDepartments.reduce((sum, d) => sum + d.compliant, 0)
  const complianceRate = Math.round((compliantDevices / totalDevices) * 100)

  function handleSaveName() {
    if (nameInput.trim()) {
      setInstitutionName(nameInput.trim())
    }
    setEditingName(false)
  }

  function handleCancelName() {
    setNameInput(institutionName)
    setEditingName(false)
  }

  function handleAddEntity() {
    if (!newEntityName.trim()) return
    addEntity(newEntityName.trim(), newEntityType)
    setNewEntityName("")
    setNewEntityType("Lab")
  }

  function handleStartEdit(entity: { id: string; name: string; type: string }) {
    setEditingEntityId(entity.id)
    setEditEntityName(entity.name)
    setEditEntityType(entity.type)
  }

  function handleSaveEdit() {
    if (editingEntityId && editEntityName.trim()) {
      updateEntity(editingEntityId, editEntityName.trim(), editEntityType)
    }
    setEditingEntityId(null)
  }

  function handleCancelEdit() {
    setEditingEntityId(null)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header with editable institution name */}
      <div className="flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#3b82f6]/15">
          <Building2 className="size-5 text-[#3b82f6]" />
        </div>
        <div className="flex flex-col gap-1">
          {editingName ? (
            <div className="flex items-center gap-2">
              <Input
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSaveName()
                  if (e.key === "Escape") handleCancelName()
                }}
                className="h-8 w-80 border-border bg-[#0a0e1a] text-sm font-bold text-foreground"
                autoFocus
              />
              <Button size="icon" variant="ghost" className="size-7 text-[#10b981]" onClick={handleSaveName}>
                <Check className="size-4" />
                <span className="sr-only">Save institution name</span>
              </Button>
              <Button size="icon" variant="ghost" className="size-7 text-muted-foreground" onClick={handleCancelName}>
                <X className="size-4" />
                <span className="sr-only">Cancel editing</span>
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-foreground">{institutionName}</h2>
              <Button
                size="icon"
                variant="ghost"
                className="size-7 text-muted-foreground hover:text-foreground"
                onClick={() => {
                  setNameInput(institutionName)
                  setEditingName(true)
                }}
              >
                <Pencil className="size-3.5" />
                <span className="sr-only">Edit institution name</span>
              </Button>
            </div>
          )}
          <p className="text-sm text-muted-foreground">Infrastructure Summary</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border bg-[#111827]">
          <CardContent className="flex flex-col items-center gap-1 pt-6">
            <span className="text-3xl font-bold text-foreground">{entities.length}</span>
            <span className="text-xs text-muted-foreground">Entities</span>
          </CardContent>
        </Card>
        <Card className="border-border bg-[#111827]">
          <CardContent className="flex flex-col items-center gap-1 pt-6">
            <span className="text-3xl font-bold text-foreground">{totalDevices}</span>
            <span className="text-xs text-muted-foreground">Total Devices</span>
          </CardContent>
        </Card>
        <Card className="border-border bg-[#111827]">
          <CardContent className="flex flex-col items-center gap-1 pt-6">
            <span className="text-3xl font-bold text-[#10b981]">{complianceRate}%</span>
            <span className="text-xs text-muted-foreground">Compliance Rate</span>
          </CardContent>
        </Card>
        <Card className="border-border bg-[#111827]">
          <CardContent className="flex flex-col items-center gap-1 pt-6">
            <span className="text-3xl font-bold text-foreground">
              {mockDepartments.filter(d => d.devices > 0).length}
            </span>
            <span className="text-xs text-muted-foreground">Active Departments</span>
          </CardContent>
        </Card>
      </div>

      {/* Entity Management */}
      <Card className="border-border bg-[#111827]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm font-medium text-foreground">
            <MapPin className="size-4 text-[#3b82f6]" />
            Entities / Sub-Units
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {/* Add new entity form */}
          <div className="flex flex-col gap-3 rounded-lg border border-dashed border-border bg-[#0a0e1a] p-4 sm:flex-row sm:items-end">
            <div className="flex-1">
              <label className="mb-1.5 block text-xs text-muted-foreground">Entity Name</label>
              <Input
                placeholder="e.g. Principal Office, Staff Room, CSE Lab..."
                value={newEntityName}
                onChange={(e) => setNewEntityName(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleAddEntity() }}
                className="border-border bg-[#111827] text-sm text-foreground"
              />
            </div>
            <div className="w-full sm:w-40">
              <label className="mb-1.5 block text-xs text-muted-foreground">Type</label>
              <Select value={newEntityType} onValueChange={setNewEntityType}>
                <SelectTrigger className="border-border bg-[#111827] text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {entityTypes.map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={handleAddEntity}
              disabled={!newEntityName.trim()}
              className="bg-[#3b82f6] text-[#ffffff] hover:bg-[#2563eb]"
            >
              <Plus className="mr-1.5 size-4" />
              Add Entity
            </Button>
          </div>

          {/* Entity list table */}
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead className="text-muted-foreground">Name</TableHead>
                <TableHead className="text-muted-foreground">Type</TableHead>
                <TableHead className="text-right text-muted-foreground">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entities.map((entity) => (
                <TableRow key={entity.id} className="border-border">
                  {editingEntityId === entity.id ? (
                    <>
                      <TableCell>
                        <Input
                          value={editEntityName}
                          onChange={(e) => setEditEntityName(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleSaveEdit()
                            if (e.key === "Escape") handleCancelEdit()
                          }}
                          className="h-8 border-border bg-[#0a0e1a] text-sm text-foreground"
                          autoFocus
                        />
                      </TableCell>
                      <TableCell>
                        <Select value={editEntityType} onValueChange={setEditEntityType}>
                          <SelectTrigger className="h-8 border-border bg-[#0a0e1a] text-foreground">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {entityTypes.map((t) => (
                              <SelectItem key={t} value={t}>{t}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button size="icon" variant="ghost" className="size-7 text-[#10b981]" onClick={handleSaveEdit}>
                            <Check className="size-3.5" />
                            <span className="sr-only">Save</span>
                          </Button>
                          <Button size="icon" variant="ghost" className="size-7 text-muted-foreground" onClick={handleCancelEdit}>
                            <X className="size-3.5" />
                            <span className="sr-only">Cancel</span>
                          </Button>
                        </div>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell className="text-sm font-medium text-foreground">{entity.name}</TableCell>
                      <TableCell>
                        <Badge className="bg-[#1e293b] text-muted-foreground border-border hover:bg-[#1e293b]">
                          {entity.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="size-7 text-muted-foreground hover:text-foreground"
                            onClick={() => handleStartEdit(entity)}
                          >
                            <Pencil className="size-3.5" />
                            <span className="sr-only">Edit entity</span>
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="size-7 text-muted-foreground hover:text-[#ef4444]"
                            onClick={() => removeEntity(entity.id)}
                          >
                            <Trash2 className="size-3.5" />
                            <span className="sr-only">Remove entity</span>
                          </Button>
                        </div>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))}
              {entities.length === 0 && (
                <TableRow className="border-border">
                  <TableCell colSpan={3} className="text-center text-sm text-muted-foreground py-8">
                    No entities added yet. Add your first entity above.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Departments / Compliance (original table) */}
      <Card className="border-border bg-[#111827]">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-foreground">Department Compliance</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead className="text-muted-foreground">Department</TableHead>
                <TableHead className="text-muted-foreground">Devices</TableHead>
                <TableHead className="text-muted-foreground">Compliant</TableHead>
                <TableHead className="text-muted-foreground">Non-Compliant</TableHead>
                <TableHead className="text-muted-foreground">Compliance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockDepartments.map((dept) => {
                const rate = dept.devices > 0 ? Math.round((dept.compliant / dept.devices) * 100) : 0
                return (
                  <TableRow key={dept.name} className="border-border">
                    <TableCell className="text-sm font-medium text-foreground">{dept.name}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{dept.devices}</TableCell>
                    <TableCell>
                      <span className="text-sm text-[#10b981]">{dept.compliant}</span>
                    </TableCell>
                    <TableCell>
                      <span className={`text-sm ${dept.nonCompliant > 0 ? "text-[#ef4444]" : "text-muted-foreground"}`}>
                        {dept.nonCompliant}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Progress value={rate} className="h-2 w-20" />
                        <Badge className={
                          rate === 100
                            ? "bg-[#10b981]/15 text-[#10b981] border-[#10b981]/30 hover:bg-[#10b981]/15"
                            : rate >= 50
                            ? "bg-[#f59e0b]/15 text-[#f59e0b] border-[#f59e0b]/30 hover:bg-[#f59e0b]/15"
                            : "bg-[#ef4444]/15 text-[#ef4444] border-[#ef4444]/30 hover:bg-[#ef4444]/15"
                        }>
                          {rate}%
                        </Badge>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* SDG Note */}
      <Card className="border-[#3b82f6]/30 bg-[#3b82f6]/5">
        <CardContent className="pt-6">
          <p className="text-sm text-foreground leading-relaxed">
            This platform is aligned with <span className="font-semibold text-[#3b82f6]">SDG 11: Sustainable Cities and Communities</span> - 
            focused on building resilient infrastructure and safe institutions. By monitoring digital infrastructure integrity, 
            we contribute to protecting institutional assets and ensuring secure operations across educational and governmental organizations.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
