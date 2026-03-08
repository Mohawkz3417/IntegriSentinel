// Types for IntegriSentinel Dashboard
// These match the data structure from your Flask backend

export interface Device {
  id: string
  name: string
  ip: string
  mac: string
  os: string
  osVersion: string
  arch: string
  processor: string
  bootTime: string
  antivirus: boolean
  firewall: boolean
  lastSeen: string
  online: boolean
  riskLevel: number
  department: string
}

export interface Alert {
  id: string
  timestamp: string
  device: string
  type: string
  severity: "critical" | "high" | "medium" | "low"
  description: string
  status: "open" | "investigating" | "resolved"
}

export interface FileChange {
  path: string
  action: "Created" | "Modified" | "Deleted"
  user: string
  device: string
  timestamp: string
  critical: boolean
}

export interface LoginActivity {
  user: string
  device: string
  timestamp: string
  success: boolean
  afterHours: boolean
}

export interface USBDevice {
  device: string
  usbName: string
  timestamp: string
  known: boolean
}

export interface OpenPort {
  device: string
  port: number
  service: string
  suspicious: boolean
}

export interface Driver {
  device: string
  name: string
  version: string
  date: string
  newlyAdded: boolean
}

export interface MaliciousHash {
  hash: string
  type: "MD5" | "SHA1" | "SHA256"
  addedDate: string
  source: string
}

export interface Department {
  name: string
  devices: number
  compliant: number
  nonCompliant: number
}

export interface Entity {
  id: string
  name: string
  type: "lab" | "office" | "room" | "other"
  location?: string
  deviceCount: number
  riskScore: number
}

export interface DatabaseLog {
  id: number
  device: string
  timestamp: string
  data: Record<string, unknown>
}

// Chart data types
export interface LoginChartData {
  date: string
  success: number
  failed: number
}

export interface FileChangeChartData {
  date: string
  changes: number
}

export interface USBChartData {
  date: string
  insertions: number
}

export interface AlertTrendData {
  date: string
  critical: number
  high: number
  medium: number
  low: number
}

export interface DeviceHealthData {
  name: string
  value: number
  fill: string
}

export interface RiskTrendData {
  date: string
  score: number
}

// API Response wrapper
export interface ApiResponse<T> {
  success: boolean
  data: T
  error?: string
  timestamp: string
}
