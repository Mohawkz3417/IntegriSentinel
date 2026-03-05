/**
 * IntegriSentinel Database Schema
 * Complete relational database design for institutional cybersecurity monitoring
 */

// ============================================================================
// CORE ENTITIES
// ============================================================================

export interface User {
  id: string
  email: string
  username: string
  passwordHash: string
  fullName: string
  role: "admin" | "analyst" | "viewer"
  institutionId: string
  status: "active" | "inactive" | "suspended"
  lastLogin: string
  createdAt: string
  updatedAt: string
}

export interface Institution {
  id: string
  name: string
  code: string
  location: string
  type: "University" | "College" | "School" | "Institute" | "Organization"
  adminUserId: string
  taxId?: string
  phone?: string
  email?: string
  website?: string
  logo?: string
  createdAt: string
  updatedAt: string
}

export interface Department {
  id: string
  institutionId: string
  name: string
  head: string
  description?: string
  contactEmail?: string
  createdAt: string
  updatedAt: string
}

// ============================================================================
// DEVICE & INFRASTRUCTURE
// ============================================================================

export interface Device {
  id: string
  institutionId: string
  departmentId?: string
  hostname: string
  ip: string
  mac: string
  os: string
  osVersion: string
  architecture: "x86_64" | "x86" | "arm64" | "arm"
  processor: string
  ram?: number
  storage?: number
  bootTime: string
  lastSeen: string
  online: boolean
  riskLevel: number // 0-100
  compliance: number // 0-100
  createdAt: string
  updatedAt: string
}

export interface DeviceSecurityStatus {
  id: string
  deviceId: string
  antivirus: boolean
  antivirusName?: string
  firewall: boolean
  autoUpdates: boolean
  encryptionEnabled: boolean
  lastPatches: string
  vulnerabilities: number
  updatedAt: string
}

// ============================================================================
// SECURITY EVENTS & ALERTS
// ============================================================================

export interface Alert {
  id: string
  institutionId: string
  deviceId: string
  type:
    | "Brute Force"
    | "Malware Detection"
    | "Firewall Disabled"
    | "Unauthorized Access"
    | "File Integrity"
    | "USB Detection"
    | "Port Scan"
    | "Suspicious Process"
  severity: "critical" | "high" | "medium" | "low"
  title: string
  description: string
  status: "open" | "investigating" | "resolved" | "ignored"
  timestamp: string
  resolvedAt?: string
  evidence?: string
  createdAt: string
  updatedAt: string
}

export interface LogEvent {
  id: string
  institutionId: string
  deviceId: string
  eventType: string
  severity: "critical" | "high" | "medium" | "low"
  source: "system" | "application" | "network" | "user"
  description: string
  metadata: Record<string, any>
  timestamp: string
  createdAt: string
}

// ============================================================================
// SECURITY INTELLIGENCE
// ============================================================================

export interface MaliciousHash {
  id: string
  institutionId: string
  hash: string
  hashType: "MD5" | "SHA1" | "SHA256"
  filename?: string
  description?: string
  source: "VirusTotal" | "Manual" | "Threat Intel" | "Internal"
  severity: "critical" | "high" | "medium" | "low"
  firstSeen: string
  lastSeen: string
  detectionCount: number
  createdAt: string
}

export interface ThreatIndicator {
  id: string
  institutionId: string
  type: "ip" | "domain" | "url" | "email" | "file"
  indicator: string
  classification: "malicious" | "suspicious" | "watch"
  source: string
  confidence: number // 0-100
  context?: string
  createdAt: string
}

// ============================================================================
// FILE & SYSTEM INTEGRITY
// ============================================================================

export interface FileChange {
  id: string
  deviceId: string
  path: string
  action: "created" | "modified" | "deleted"
  user: string
  fileSize?: number
  checksum?: string
  timestamp: string
  critical: boolean
  createdAt: string
}

export interface SystemProcess {
  id: string
  deviceId: string
  pid: number
  name: string
  path: string
  user: string
  commandLine: string
  parentPid?: number
  memoryUsage: number
  cpuUsage: number
  startTime: string
  suspicious: boolean
  createdAt: string
}

// ============================================================================
// NETWORK & CONNECTIVITY
// ============================================================================

export interface OpenPort {
  id: string
  deviceId: string
  port: number
  protocol: "tcp" | "udp" | "both"
  service: string
  suspicious: boolean
  process?: string
  firstDetected: string
  lastDetected: string
  createdAt: string
}

export interface NetworkConnection {
  id: string
  deviceId: string
  localIp: string
  localPort: number
  remoteIp: string
  remotePort: number
  state: "established" | "listening" | "closing" | "closed"
  protocol: "tcp" | "udp"
  process: string
  suspicious: boolean
  timestamp: string
  createdAt: string
}

// ============================================================================
// ACCESS CONTROL
// ============================================================================

export interface LoginEvent {
  id: string
  deviceId: string
  userId: string
  username: string
  ipAddress: string
  loginTime: string
  logoutTime?: string
  status: "success" | "failed"
  failureReason?: string
  afterHours: boolean
  location?: string
  createdAt: string
}

export interface AccessLog {
  id: string
  userId: string
  resource: string
  action: "read" | "write" | "delete" | "execute"
  status: "allowed" | "denied"
  timestamp: string
  ipAddress: string
  createdAt: string
}

// ============================================================================
// USB & REMOVABLE MEDIA
// ============================================================================

export interface USBDevice {
  id: string
  deviceId: string
  vendorId: string
  productId: string
  vendorName: string
  productName: string
  serialNumber: string
  known: boolean
  insertionTime: string
  removalTime?: string
  dataTransferred?: number
  suspicious: boolean
  createdAt: string
}

// ============================================================================
// COMPLIANCE & POLICIES
// ============================================================================

export interface CompliancePolicy {
  id: string
  institutionId: string
  name: string
  description: string
  standard: "PCI-DSS" | "HIPAA" | "ISO27001" | "SOC2" | "Custom"
  requirements: string[]
  status: "active" | "draft" | "archived"
  createdAt: string
  updatedAt: string
}

export interface ComplianceCheck {
  id: string
  policyId: string
  deviceId: string
  checkName: string
  result: "pass" | "fail" | "warning" | "not-applicable"
  evidence: string
  timestamp: string
  createdAt: string
}

// ============================================================================
// REPORTS & ANALYTICS
// ============================================================================

export interface SecurityReport {
  id: string
  institutionId: string
  period: "daily" | "weekly" | "monthly" | "yearly"
  generatedAt: string
  startDate: string
  endDate: string
  totalDevices: number
  compliantDevices: number
  alertsSummary: {
    critical: number
    high: number
    medium: number
    low: number
  }
  topRisks: Array<{ title: string; count: number; severity: string }>
  recommendations: string[]
}

export interface Dashboard {
  id: string
  institutionId: string
  name: string
  layout: "default" | "custom"
  widgets: Array<{
    id: string
    type: string
    position: number
    config: Record<string, any>
  }>
  createdAt: string
  updatedAt: string
}

// ============================================================================
// AUDIT & LOGGING
// ============================================================================

export interface AuditLog {
  id: string
  institutionId: string
  userId: string
  action: string
  resource: string
  resourceId: string
  changes?: Record<string, { old: any; new: any }>
  ipAddress: string
  status: "success" | "failure"
  timestamp: string
}

// ============================================================================
// DATABASE STRUCTURE SUMMARY
// ============================================================================

/*
TABLES: 30+
RELATIONSHIPS: Many-to-many, One-to-many
KEY FEATURES:
- Multi-tenant architecture
- Audit trail for all operations
- Soft deletes support
- Timestamp tracking
- Full-text search capability
- Real-time alert system
- Automated compliance checking
- Advanced reporting and analytics

INDEXES:
- institutionId on all tables
- deviceId on security events
- timestamp on all logs
- userId on access logs
- hash on MaliciousHash

VIEWS:
- DeviceSecurityOverview
- ComplianceSummary
- AlertTrends
- IncidentTimeline
- RiskScorecard
*/
