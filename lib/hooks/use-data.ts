"use client"

// SWR hooks for data fetching with automatic caching
// These hooks automatically fetch from Flask backend when configured,
// or fall back to mock data

import useSWR from "swr"
import {
  getDevices,
  getDeviceById,
  getDevicesByEntity,
  getAlerts,
  getAlertsByDevice,
  getFileChanges,
  getFileChangesByDevice,
  getLoginActivity,
  getUSBDevices,
  getOpenPorts,
  getDrivers,
  getMaliciousHashes,
  getDepartments,
  getEntities,
  getDatabaseLogs,
  getLoginChartData,
  getFileChangeChartData,
  getUSBChartData,
  getAlertTrendData,
  getDeviceHealthData,
  getRiskTrendData,
  getDashboardSummary,
  getEntityData,
} from "../api"

// Revalidation interval in milliseconds (30 seconds for live data)
const REFRESH_INTERVAL = 30000

// ============================================
// DEVICE HOOKS
// ============================================

export function useDevices() {
  return useSWR("devices", getDevices, {
    refreshInterval: REFRESH_INTERVAL,
    revalidateOnFocus: true,
  })
}

export function useDevice(id: string | null) {
  return useSWR(id ? `device-${id}` : null, () => (id ? getDeviceById(id) : null), {
    refreshInterval: REFRESH_INTERVAL,
  })
}

export function useDevicesByEntity(entityName: string | null) {
  return useSWR(
    entityName ? `devices-entity-${entityName}` : null,
    () => (entityName ? getDevicesByEntity(entityName) : []),
    {
      refreshInterval: REFRESH_INTERVAL,
    }
  )
}

// ============================================
// ALERT HOOKS
// ============================================

export function useAlerts() {
  return useSWR("alerts", getAlerts, {
    refreshInterval: REFRESH_INTERVAL,
    revalidateOnFocus: true,
  })
}

export function useAlertsByDevice(deviceName: string | null) {
  return useSWR(
    deviceName ? `alerts-device-${deviceName}` : null,
    () => (deviceName ? getAlertsByDevice(deviceName) : []),
    {
      refreshInterval: REFRESH_INTERVAL,
    }
  )
}

// ============================================
// FILE CHANGE HOOKS
// ============================================

export function useFileChanges() {
  return useSWR("file-changes", getFileChanges, {
    refreshInterval: REFRESH_INTERVAL,
  })
}

export function useFileChangesByDevice(deviceName: string | null) {
  return useSWR(
    deviceName ? `file-changes-device-${deviceName}` : null,
    () => (deviceName ? getFileChangesByDevice(deviceName) : []),
    {
      refreshInterval: REFRESH_INTERVAL,
    }
  )
}

// ============================================
// LOGIN ACTIVITY HOOKS
// ============================================

export function useLoginActivity() {
  return useSWR("login-activity", getLoginActivity, {
    refreshInterval: REFRESH_INTERVAL,
  })
}

// ============================================
// USB DEVICE HOOKS
// ============================================

export function useUSBDevices() {
  return useSWR("usb-devices", getUSBDevices, {
    refreshInterval: REFRESH_INTERVAL,
  })
}

// ============================================
// OPEN PORTS HOOKS
// ============================================

export function useOpenPorts() {
  return useSWR("open-ports", getOpenPorts, {
    refreshInterval: REFRESH_INTERVAL,
  })
}

// ============================================
// DRIVER HOOKS
// ============================================

export function useDrivers() {
  return useSWR("drivers", getDrivers, {
    refreshInterval: REFRESH_INTERVAL,
  })
}

// ============================================
// MALICIOUS HASH HOOKS
// ============================================

export function useMaliciousHashes() {
  return useSWR("malicious-hashes", getMaliciousHashes, {
    refreshInterval: REFRESH_INTERVAL,
  })
}

// ============================================
// DEPARTMENT/ENTITY HOOKS
// ============================================

export function useDepartments() {
  return useSWR("departments", getDepartments, {
    refreshInterval: REFRESH_INTERVAL,
  })
}

export function useEntities() {
  return useSWR("entities", getEntities, {
    refreshInterval: REFRESH_INTERVAL,
  })
}

// ============================================
// DATABASE LOG HOOKS
// ============================================

export function useDatabaseLogs() {
  return useSWR("database-logs", getDatabaseLogs, {
    refreshInterval: REFRESH_INTERVAL,
  })
}

// ============================================
// CHART DATA HOOKS
// ============================================

export function useLoginChartData() {
  return useSWR("chart-logins", getLoginChartData, {
    refreshInterval: REFRESH_INTERVAL,
  })
}

export function useFileChangeChartData() {
  return useSWR("chart-file-changes", getFileChangeChartData, {
    refreshInterval: REFRESH_INTERVAL,
  })
}

export function useUSBChartData() {
  return useSWR("chart-usb", getUSBChartData, {
    refreshInterval: REFRESH_INTERVAL,
  })
}

export function useAlertTrendData() {
  return useSWR("chart-alert-trends", getAlertTrendData, {
    refreshInterval: REFRESH_INTERVAL,
  })
}

export function useDeviceHealthData() {
  return useSWR("chart-device-health", getDeviceHealthData, {
    refreshInterval: REFRESH_INTERVAL,
  })
}

export function useRiskTrendData() {
  return useSWR("chart-risk-trend", getRiskTrendData, {
    refreshInterval: REFRESH_INTERVAL,
  })
}

// ============================================
// DASHBOARD SUMMARY HOOK
// ============================================

export function useDashboardSummary() {
  return useSWR("dashboard-summary", getDashboardSummary, {
    refreshInterval: REFRESH_INTERVAL,
    revalidateOnFocus: true,
  })
}

// ============================================
// ENTITY DATA HOOK (all data for one entity)
// ============================================

export function useEntityData(entityName: string | null) {
  return useSWR(
    entityName ? `entity-data-${entityName}` : null,
    () => (entityName ? getEntityData(entityName) : null),
    {
      refreshInterval: REFRESH_INTERVAL,
    }
  )
}
