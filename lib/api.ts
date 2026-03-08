// API Client for IntegriSentinel
// Configure FLASK_API_URL to point to your Flask backend

import type {
  Device,
  Alert,
  FileChange,
  LoginActivity,
  USBDevice,
  OpenPort,
  Driver,
  MaliciousHash,
  Department,
  Entity,
  DatabaseLog,
  LoginChartData,
  FileChangeChartData,
  USBChartData,
  AlertTrendData,
  DeviceHealthData,
  RiskTrendData,
} from "./types"

// Import mock data as fallback
import {
  mockDevices,
  mockAlerts,
  mockFileChanges,
  mockLoginActivity,
  mockUSBDevices,
  mockOpenPorts,
  mockDrivers,
  mockMaliciousHashes,
  mockDepartments,
  mockDatabaseLogs,
  mockLoginChartData,
  mockFileChangeChartData,
  mockUSBChartData,
  mockAlertTrendData,
  mockDeviceHealthData,
  mockRiskTrendData,
} from "./mock-data"

// ============================================
// CONFIGURATION - Update this to your Flask API URL
// ============================================
const FLASK_API_URL = process.env.NEXT_PUBLIC_FLASK_API_URL || ""

// Set to true when your Flask backend is ready
const USE_LIVE_API = !!FLASK_API_URL

// Log connection status on first load (helpful for debugging)
if (typeof window !== "undefined") {
  if (USE_LIVE_API) {
    console.info(`[IntegriSentinel] Connected to Flask API: ${FLASK_API_URL}`)
  } else {
    console.info("[IntegriSentinel] Running in DEMO MODE with mock data")
    console.info("[IntegriSentinel] To connect Flask backend, set environment variable:")
    console.info("  NEXT_PUBLIC_FLASK_API_URL=http://your-flask-server:5000")
  }
}

// ============================================
// API FETCHER
// ============================================
async function fetchFromApi<T>(endpoint: string, fallbackData: T): Promise<T> {
  if (!USE_LIVE_API) {
    // Return mock data when Flask is not configured
    return fallbackData
  }

  try {
    const response = await fetch(`${FLASK_API_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      console.warn(`API request failed for ${endpoint}, using fallback data`)
      return fallbackData
    }

    const data = await response.json()
    // Handle wrapped response { success, data } or direct data
    return data.data ?? data
  } catch (error) {
    console.warn(`API error for ${endpoint}:`, error)
    return fallbackData
  }
}

// ============================================
// API ENDPOINTS
// ============================================

// Devices
export async function getDevices(): Promise<Device[]> {
  return fetchFromApi("/api/devices", mockDevices)
}

export async function getDeviceById(id: string): Promise<Device | null> {
  const device = mockDevices.find((d) => d.id === id) || null
  return fetchFromApi(`/api/devices/${id}`, device)
}

export async function getDevicesByEntity(entityName: string): Promise<Device[]> {
  const filtered = mockDevices.filter((d) => d.department === entityName)
  return fetchFromApi(`/api/devices?entity=${encodeURIComponent(entityName)}`, filtered)
}

// Alerts
export async function getAlerts(): Promise<Alert[]> {
  return fetchFromApi("/api/alerts", mockAlerts)
}

export async function getAlertsByDevice(deviceName: string): Promise<Alert[]> {
  const filtered = mockAlerts.filter((a) => a.device === deviceName)
  return fetchFromApi(`/api/alerts?device=${encodeURIComponent(deviceName)}`, filtered)
}

export async function getAlertsBySeverity(severity: string): Promise<Alert[]> {
  const filtered = mockAlerts.filter((a) => a.severity === severity)
  return fetchFromApi(`/api/alerts?severity=${severity}`, filtered)
}

// File Changes
export async function getFileChanges(): Promise<FileChange[]> {
  return fetchFromApi("/api/file-changes", mockFileChanges)
}

export async function getFileChangesByDevice(deviceName: string): Promise<FileChange[]> {
  const filtered = mockFileChanges.filter((f) => f.device === deviceName)
  return fetchFromApi(`/api/file-changes?device=${encodeURIComponent(deviceName)}`, filtered)
}

// Login Activity
export async function getLoginActivity(): Promise<LoginActivity[]> {
  return fetchFromApi("/api/login-activity", mockLoginActivity)
}

export async function getLoginActivityByDevice(deviceName: string): Promise<LoginActivity[]> {
  const filtered = mockLoginActivity.filter((l) => l.device === deviceName)
  return fetchFromApi(`/api/login-activity?device=${encodeURIComponent(deviceName)}`, filtered)
}

// USB Devices
export async function getUSBDevices(): Promise<USBDevice[]> {
  return fetchFromApi("/api/usb-devices", mockUSBDevices)
}

export async function getUSBDevicesByDevice(deviceName: string): Promise<USBDevice[]> {
  const filtered = mockUSBDevices.filter((u) => u.device === deviceName)
  return fetchFromApi(`/api/usb-devices?device=${encodeURIComponent(deviceName)}`, filtered)
}

// Open Ports
export async function getOpenPorts(): Promise<OpenPort[]> {
  return fetchFromApi("/api/open-ports", mockOpenPorts)
}

export async function getOpenPortsByDevice(deviceName: string): Promise<OpenPort[]> {
  const filtered = mockOpenPorts.filter((p) => p.device === deviceName)
  return fetchFromApi(`/api/open-ports?device=${encodeURIComponent(deviceName)}`, filtered)
}

// Drivers
export async function getDrivers(): Promise<Driver[]> {
  return fetchFromApi("/api/drivers", mockDrivers)
}

export async function getDriversByDevice(deviceName: string): Promise<Driver[]> {
  const filtered = mockDrivers.filter((d) => d.device === deviceName)
  return fetchFromApi(`/api/drivers?device=${encodeURIComponent(deviceName)}`, filtered)
}

// Malicious Hashes
export async function getMaliciousHashes(): Promise<MaliciousHash[]> {
  return fetchFromApi("/api/malicious-hashes", mockMaliciousHashes)
}

// Departments / Entities
export async function getDepartments(): Promise<Department[]> {
  return fetchFromApi("/api/departments", mockDepartments)
}

export async function getEntities(): Promise<Entity[]> {
  // Convert departments to entities format
  const entities: Entity[] = mockDepartments.map((d, index) => ({
    id: `ENT-${String(index + 1).padStart(3, "0")}`,
    name: d.name,
    type: d.name.toLowerCase().includes("lab")
      ? "lab"
      : d.name.toLowerCase().includes("office")
        ? "office"
        : d.name.toLowerCase().includes("room")
          ? "room"
          : "other",
    deviceCount: d.devices,
    riskScore: Math.round(((d.nonCompliant / d.devices) * 100) || 0),
  }))
  return fetchFromApi("/api/entities", entities)
}

// Database Logs
export async function getDatabaseLogs(): Promise<DatabaseLog[]> {
  return fetchFromApi("/api/logs", mockDatabaseLogs)
}

// Chart Data
export async function getLoginChartData(): Promise<LoginChartData[]> {
  return fetchFromApi("/api/charts/logins", mockLoginChartData)
}

export async function getFileChangeChartData(): Promise<FileChangeChartData[]> {
  return fetchFromApi("/api/charts/file-changes", mockFileChangeChartData)
}

export async function getUSBChartData(): Promise<USBChartData[]> {
  return fetchFromApi("/api/charts/usb", mockUSBChartData)
}

export async function getAlertTrendData(): Promise<AlertTrendData[]> {
  return fetchFromApi("/api/charts/alert-trends", mockAlertTrendData)
}

export async function getDeviceHealthData(): Promise<DeviceHealthData[]> {
  return fetchFromApi("/api/charts/device-health", mockDeviceHealthData)
}

export async function getRiskTrendData(): Promise<RiskTrendData[]> {
  return fetchFromApi("/api/charts/risk-trend", mockRiskTrendData)
}

// ============================================
// DASHBOARD SUMMARY
// ============================================
export interface DashboardSummary {
  totalDevices: number
  onlineDevices: number
  offlineDevices: number
  criticalAlerts: number
  highAlerts: number
  mediumAlerts: number
  lowAlerts: number
  averageRiskScore: number
  recentAlerts: Alert[]
  topRiskDevices: Device[]
}

export async function getDashboardSummary(): Promise<DashboardSummary> {
  const [devices, alerts] = await Promise.all([getDevices(), getAlerts()])

  const summary: DashboardSummary = {
    totalDevices: devices.length,
    onlineDevices: devices.filter((d) => d.online).length,
    offlineDevices: devices.filter((d) => !d.online).length,
    criticalAlerts: alerts.filter((a) => a.severity === "critical" && a.status !== "resolved").length,
    highAlerts: alerts.filter((a) => a.severity === "high" && a.status !== "resolved").length,
    mediumAlerts: alerts.filter((a) => a.severity === "medium" && a.status !== "resolved").length,
    lowAlerts: alerts.filter((a) => a.severity === "low" && a.status !== "resolved").length,
    averageRiskScore: Math.round(devices.reduce((acc, d) => acc + d.riskLevel, 0) / devices.length),
    recentAlerts: alerts.slice(0, 5),
    topRiskDevices: [...devices].sort((a, b) => b.riskLevel - a.riskLevel).slice(0, 5),
  }

  return fetchFromApi("/api/dashboard/summary", summary)
}

// ============================================
// UTILITY: Get data for a specific entity
// ============================================
export async function getEntityData(entityName: string) {
  const [devices, alerts, fileChanges, loginActivity, usbDevices, openPorts, drivers] = await Promise.all([
    getDevicesByEntity(entityName),
    getAlerts(),
    getFileChanges(),
    getLoginActivity(),
    getUSBDevices(),
    getOpenPorts(),
    getDrivers(),
  ])

  // Filter all data by devices in this entity
  const deviceNames = devices.map((d) => d.name)

  return {
    devices,
    alerts: alerts.filter((a) => deviceNames.includes(a.device)),
    fileChanges: fileChanges.filter((f) => deviceNames.includes(f.device)),
    loginActivity: loginActivity.filter((l) => deviceNames.includes(l.device)),
    usbDevices: usbDevices.filter((u) => deviceNames.includes(u.device)),
    openPorts: openPorts.filter((p) => deviceNames.includes(p.device)),
    drivers: drivers.filter((d) => deviceNames.includes(d.device)),
  }
}
