"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { mockMaliciousHashes } from "@/lib/mock-data"
import { useRole } from "@/lib/role-context"
import { redirect } from "next/navigation"
import { Search, Upload, Plus, Trash2, Shield, RefreshCw, Hash } from "lucide-react"
import { formatUTCDate } from "@/lib/utils"

export default function MaliciousHashPage() {
  const { isAdmin } = useRole()
  const [hashes, setHashes] = useState(mockMaliciousHashes)
  const [newHash, setNewHash] = useState("")
  const [newType, setNewType] = useState("MD5")
  const [searchQuery, setSearchQuery] = useState("")

  if (!isAdmin) {
    redirect("/dashboard")
  }

  const filtered = hashes.filter(
    (h) =>
      h.hash.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.source.toLowerCase().includes(searchQuery.toLowerCase())
  )

  function handleAddHash() {
    if (!newHash.trim()) return
    setHashes([
      {
        hash: newHash.trim(),
        type: newType,
        addedDate: new Date().toISOString().split("T")[0],
        source: "Manual Upload",
      },
      ...hashes,
    ])
    setNewHash("")
  }

  function handleDeleteHash(hash: string) {
    setHashes(hashes.filter((h) => h.hash !== hash))
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-lg bg-[#ef4444]/15">
          <Shield className="size-5 text-[#ef4444]" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">Malicious Hash Intelligence</h2>
          <p className="text-sm text-muted-foreground">
            Manage known malicious file hashes for agent-based detection
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="border-border bg-[#111827]">
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex size-10 items-center justify-center rounded-lg bg-[#3b82f6]/15">
              <Hash className="size-5 text-[#3b82f6]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{hashes.length}</p>
              <p className="text-xs text-muted-foreground">Total Hashes</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-[#111827]">
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex size-10 items-center justify-center rounded-lg bg-[#10b981]/15">
              <RefreshCw className="size-5 text-[#10b981]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">2026-03-02</p>
              <p className="text-xs text-muted-foreground">Last Updated</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-[#111827]">
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex size-10 items-center justify-center rounded-lg bg-[#10b981]/15">
              <Shield className="size-5 text-[#10b981]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-[#10b981] animate-pulse" />
                <p className="text-sm font-semibold text-foreground">Synced</p>
              </div>
              <p className="text-xs text-muted-foreground">Agent Sync Status</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Hash + Upload */}
      <Card className="border-border bg-[#111827]">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-foreground">Add New Hash</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-end gap-3">
            <div className="flex-1">
              <label className="mb-1.5 block text-xs text-muted-foreground">Hash Value</label>
              <Input
                placeholder="Enter MD5, SHA1 or SHA256 hash..."
                value={newHash}
                onChange={(e) => setNewHash(e.target.value)}
                className="border-border bg-[#0a0e1a] font-mono text-sm text-foreground"
              />
            </div>
            <div className="w-32">
              <label className="mb-1.5 block text-xs text-muted-foreground">Type</label>
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
                className="flex h-10 w-full rounded-md border border-border bg-[#0a0e1a] px-3 py-2 text-sm text-foreground"
              >
                <option value="MD5">MD5</option>
                <option value="SHA1">SHA1</option>
                <option value="SHA256">SHA256</option>
              </select>
            </div>
            <Button onClick={handleAddHash} className="bg-[#3b82f6] text-[#ffffff] hover:bg-[#2563eb]">
              <Plus className="mr-1.5 size-4" />
              Add Hash
            </Button>
            <Button variant="outline" className="border-border text-foreground">
              <Upload className="mr-1.5 size-4" />
              Upload File
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search + Table */}
      <div className="relative w-full sm:w-72">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search hashes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border-border bg-[#111827] pl-9 text-foreground"
        />
      </div>

      <Card className="border-border bg-[#111827]">
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead className="text-muted-foreground">Hash</TableHead>
                <TableHead className="text-muted-foreground">Type</TableHead>
                <TableHead className="text-muted-foreground">Added Date</TableHead>
                <TableHead className="text-muted-foreground">Source</TableHead>
                <TableHead className="text-muted-foreground">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((h, i) => (
                <TableRow key={i} className="border-border">
                  <TableCell className="max-w-[300px] truncate font-mono text-xs text-foreground">
                    {h.hash}
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-[#3b82f6]/15 text-[#3b82f6] border-[#3b82f6]/30 hover:bg-[#3b82f6]/15">
                      {h.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{h.addedDate}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{h.source}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 text-[#ef4444] hover:bg-[#ef4444]/10 hover:text-[#ef4444]"
                      onClick={() => handleDeleteHash(h.hash)}
                    >
                      <Trash2 className="size-4" />
                      <span className="sr-only">Delete hash</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="py-8 text-center text-sm text-muted-foreground">
                    No matching hashes found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
