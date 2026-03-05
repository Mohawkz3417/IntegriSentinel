'use client'

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Database, Search, Download, RefreshCw, Filter, ChevronDown,
  ChevronRight, Copy, Eye, EyeOff, MoreVertical, FileJson, Table as TableIcon,
} from "lucide-react"
import { useInstitution } from "@/lib/institution-context"

// Mock database collections
const mockDatabaseCollections = {
  institutions: [
    {
      id: "inst-1",
      name: "National Institute of Technology",
      code: "NIT",
      location: "Nagpur, India",
      admin: "Dr. Ajay Singh",
      type: "Institute",
      createdAt: "2025-01-15",
      devices: 12,
      status: "active",
    },
    {
      id: "inst-2",
      name: "Central University",
      code: "CU",
      location: "Delhi, India",
      admin: "Prof. Rajesh Kumar",
      type: "University",
      createdAt: "2025-01-10",
      devices: 24,
      status: "active",
    },
  ],
  devices: [
    {
      id: "dev-1",
      name: "Server-01",
      ip: "192.168.1.100",
      mac: "00:1A:2B:3C:4D:5E",
      os: "Ubuntu 22.04",
      status: "online",
      lastSeen: "2025-03-05T10:30:00Z",
      riskLevel: "low",
      institutionId: "inst-1",
    },
    {
      id: "dev-2",
      name: "Workstation-05",
      ip: "192.168.1.105",
      mac: "00:1A:2B:3C:4D:5F",
      os: "Windows 11",
      status: "online",
      lastSeen: "2025-03-05T10:25:00Z",
      riskLevel: "medium",
      institutionId: "inst-1",
    },
    {
      id: "dev-3",
      name: "Laptop-Guest",
      ip: "192.168.1.110",
      mac: "00:1A:2B:3C:4D:60",
      os: "MacOS Ventura",
      status: "offline",
      lastSeen: "2025-03-04T15:00:00Z",
      riskLevel: "high",
      institutionId: "inst-2",
    },
  ],
  alerts: [
    {
      id: "alert-1",
      deviceId: "dev-1",
      type: "SUSPICIOUS_LOGIN",
      severity: "high",
      message: "Multiple failed login attempts detected",
      timestamp: "2025-03-05T09:15:00Z",
      resolved: false,
      institutionId: "inst-1",
    },
    {
      id: "alert-2",
      deviceId: "dev-2",
      type: "FILE_INTEGRITY_BREACH",
      severity: "critical",
      message: "Critical system file modification detected",
      timestamp: "2025-03-05T08:45:00Z",
      resolved: false,
      institutionId: "inst-1",
    },
  ],
  auditLogs: [
    {
      id: "log-1",
      userId: "admin-1",
      action: "LOGIN",
      target: "Device Server-01",
      timestamp: "2025-03-05T10:30:00Z",
      details: "Successful login from 203.0.113.5",
      status: "success",
    },
    {
      id: "log-2",
      userId: "user-2",
      action: "FILE_ACCESS",
      target: "/etc/passwd",
      timestamp: "2025-03-05T10:15:00Z",
      details: "Read access to sensitive file",
      status: "warning",
    },
  ],
  policies: [
    {
      id: "pol-1",
      name: "Password Policy",
      description: "Minimum 12 characters, mixed case, numbers, symbols",
      status: "active",
      appliedDevices: 12,
      createdAt: "2025-01-20",
      lastModified: "2025-03-01",
    },
    {
      id: "pol-2",
      name: "USB Restriction Policy",
      description: "Block all USB devices except whitelisted",
      status: "active",
      appliedDevices: 8,
      createdAt: "2025-01-25",
      lastModified: "2025-02-28",
    },
  ],
}

type CollectionKey = keyof typeof mockDatabaseCollections

export default function DatabaseViewerPage() {
  const { institutions } = useInstitution()
  const [selectedCollection, setSelectedCollection] = useState<CollectionKey>("institutions")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterKey, setFilterKey] = useState("all")
  const [viewMode, setViewMode] = useState<"table" | "json">("table")
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())
  const [showFilterPanel, setShowFilterPanel] = useState(false)

  const collections = Object.entries(mockDatabaseCollections)
  const currentData = mockDatabaseCollections[selectedCollection]
  const currentArray = Array.isArray(currentData) ? currentData : [currentData]

  const filteredData = useMemo(() => {
    return currentArray.filter((item: any) => {
      const searchLower = searchQuery.toLowerCase()
      const itemStr = JSON.stringify(item).toLowerCase()
      return itemStr.includes(searchLower)
    })
  }, [currentArray, searchQuery])

  const toggleRowExpand = (id: string) => {
    const newSet = new Set(expandedRows)
    if (newSet.has(id)) {
      newSet.delete(id)
    } else {
      newSet.add(id)
    }
    setExpandedRows(newSet)
  }

  const downloadAsJson = () => {
    const dataStr = JSON.stringify(filteredData, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${selectedCollection}-${new Date().toISOString()}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const downloadAsCSV = () => {
    if (!filteredData.length) return
    const headers = Object.keys(filteredData[0])
    const csv = [
      headers.join(","),
      ...filteredData.map((row: any) =>
        headers.map((header) => {
          const value = row[header]
          return typeof value === "string" && value.includes(",")
            ? `"${value}"`
            : value
        }).join(",")
      ),
    ].join("\n")
    
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${selectedCollection}-${new Date().toISOString()}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "active":
      case "online":
      case "success":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
      case "offline":
      case "inactive":
        return "bg-slate-500/20 text-slate-300 border-slate-500/30"
      case "warning":
        return "bg-amber-500/20 text-amber-300 border-amber-500/30"
      case "critical":
      case "high":
        return "bg-red-500/20 text-red-300 border-red-500/30"
      default:
        return "bg-cyan-500/20 text-cyan-300 border-cyan-500/30"
    }
  }

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-start gap-4 rounded-lg border border-cyan-500/20 bg-gradient-to-r from-slate-900/50 to-slate-800/30 p-6">
        <div className="flex size-12 items-center justify-center rounded-lg border border-cyan-500/30 bg-gradient-to-br from-cyan-500/20 to-cyan-500/10 shadow-lg shadow-cyan-500/10">
          <Database className="size-6 text-cyan-400" />
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
            Database Viewer
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Explore all database collections with advanced filtering and export options
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-4 rounded-lg border border-cyan-500/10 bg-slate-900/30 p-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Collection Selector */}
          <Select value={selectedCollection} onValueChange={(value) => {
            setSelectedCollection(value as CollectionKey)
            setSearchQuery("")
            setExpandedRows(new Set())
          }}>
            <SelectTrigger className="w-48 border-cyan-500/20 bg-slate-900/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-cyan-500/20">
              {collections.map(([key]) => (
                <SelectItem key={key} value={key}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* View Mode Toggle */}
          <div className="flex gap-2">
            <Button
              variant={viewMode === "table" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("table")}
              className={viewMode === "table" ? "bg-cyan-500/20 border-cyan-500/30" : ""}
            >
              <TableIcon className="size-4 mr-2" />
              Table
            </Button>
            <Button
              variant={viewMode === "json" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("json")}
              className={viewMode === "json" ? "bg-cyan-500/20 border-cyan-500/30" : ""}
            >
              <FileJson className="size-4 mr-2" />
              JSON
            </Button>
          </div>

          {/* Export Buttons */}
          <div className="flex gap-2 ml-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={downloadAsJson}
              className="border-cyan-500/20 hover:bg-cyan-500/10"
            >
              <Download className="size-4 mr-2" />
              JSON
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={downloadAsCSV}
              className="border-cyan-500/20 hover:bg-cyan-500/10"
            >
              <Download className="size-4 mr-2" />
              CSV
            </Button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={`Search ${selectedCollection}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-cyan-500/20 bg-slate-900/50 pl-9 focus:border-cyan-500/50 focus:ring-cyan-500/20"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Badge className="bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 text-cyan-300 border-cyan-500/30 shadow-lg shadow-cyan-500/10">
              {filteredData.length} records found
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFilterPanel(!showFilterPanel)}
              className="text-cyan-400 hover:bg-cyan-500/10"
            >
              <Filter className="size-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Data Display */}
      {viewMode === "table" ? (
        <Card className="border-cyan-500/20 bg-gradient-to-br from-slate-900/50 to-slate-800/30 overflow-hidden">
          <CardHeader className="border-b border-cyan-500/10 pb-4">
            <CardTitle className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
              {selectedCollection.charAt(0).toUpperCase() + selectedCollection.slice(1)} Records
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 p-0">
            <ScrollArea className="w-full h-[600px]">
              <div className="p-6 space-y-3">
                {filteredData.length === 0 ? (
                  <div className="py-12 text-center text-sm text-muted-foreground">
                    No records found matching your search
                  </div>
                ) : (
                  filteredData.map((item: any, idx: number) => {
                    const itemId = item.id || `row-${idx}`
                    const isExpanded = expandedRows.has(itemId)
                    return (
                      <div
                        key={itemId}
                        className="rounded-lg border border-cyan-500/10 bg-slate-900/30 hover:border-cyan-500/20 transition-all group animate-slide-up"
                        style={{ animationDelay: `${idx * 30}ms` }}
                      >
                        <button
                          onClick={() => toggleRowExpand(itemId)}
                          className="w-full flex items-start gap-3 p-4 text-left hover:bg-slate-900/50 transition-colors"
                        >
                          {isExpanded ? (
                            <ChevronDown className="size-5 text-cyan-400 shrink-0 mt-0.5" />
                          ) : (
                            <ChevronRight className="size-5 text-muted-foreground shrink-0 mt-0.5 group-hover:text-cyan-400" />
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 flex-wrap">
                              <span className="font-semibold text-foreground">
                                {item.name || item.label || item.title || `Record #${idx + 1}`}
                              </span>
                              {item.status && (
                                <Badge className={`${getStatusColor(item.status)} text-xs`}>
                                  {item.status}
                                </Badge>
                              )}
                              {item.severity && (
                                <Badge className={`${getStatusColor(item.severity)} text-xs`}>
                                  {item.severity}
                                </Badge>
                              )}
                              {item.riskLevel && (
                                <Badge className={`${getStatusColor(item.riskLevel)} text-xs`}>
                                  Risk: {item.riskLevel}
                                </Badge>
                              )}
                            </div>
                            {item.description && (
                              <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                            )}
                          </div>
                        </button>

                        {isExpanded && (
                          <div className="border-t border-cyan-500/10 bg-slate-900/50 p-4 animate-slide-up">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              {Object.entries(item).map(([key, value]) => (
                                <div key={key} className="space-y-1">
                                  <p className="text-xs font-semibold text-cyan-300">{key}</p>
                                  <p className="text-xs text-muted-foreground break-all">
                                    {typeof value === "object"
                                      ? JSON.stringify(value)
                                      : String(value)}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-cyan-500/20 bg-gradient-to-br from-slate-900/50 to-slate-800/30 overflow-hidden">
          <CardHeader className="border-b border-cyan-500/10 pb-4">
            <CardTitle className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
              JSON View
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 p-0">
            <ScrollArea className="w-full h-[600px]">
              <pre className="p-6 text-xs font-mono text-cyan-100 bg-slate-900/60 overflow-x-auto">
                {JSON.stringify(filteredData, null, 2)}
              </pre>
            </ScrollArea>
          </CardContent>
        </Card>
      )}

      {/* Statistics Footer */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {collections.map(([key, data]) => {
          const count = Array.isArray(data) ? data.length : 1
          return (
            <Card
              key={key}
              className="border-cyan-500/20 bg-gradient-to-br from-slate-900/50 to-slate-800/30 hover:border-cyan-500/40 transition-all cursor-pointer group"
              onClick={() => setSelectedCollection(key as CollectionKey)}
            >
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-cyan-400 group-hover:text-cyan-300">{count}</p>
                  <p className="text-xs text-muted-foreground mt-1 group-hover:text-cyan-300/70 transition-colors">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
