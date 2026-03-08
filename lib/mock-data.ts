// Mock data for the cybersecurity dashboard

export const mockDevices = [
  { id: "HOST-001", name: "CSE-LAB-PC01", ip: "192.168.1.101", mac: "AA:BB:CC:DD:EE:01", os: "Windows 11 Pro", osVersion: "23H2", arch: "x86_64", processor: "Intel i7-12700", bootTime: "2026-03-02T08:15:00Z", antivirus: true, firewall: true, lastSeen: "2026-03-02T14:30:00Z", online: true, riskLevel: 22, department: "CSE Lab" },
  { id: "HOST-002", name: "ADMIN-PC01", ip: "192.168.1.102", mac: "AA:BB:CC:DD:EE:02", os: "Windows 10 Pro", osVersion: "22H2", arch: "x86_64", processor: "Intel i5-11400", bootTime: "2026-03-02T07:45:00Z", antivirus: true, firewall: true, lastSeen: "2026-03-02T14:28:00Z", online: true, riskLevel: 15, department: "Admin Office" },
  { id: "HOST-003", name: "LIB-PC01", ip: "192.168.1.103", mac: "AA:BB:CC:DD:EE:03", os: "Ubuntu 22.04", osVersion: "22.04.3", arch: "x86_64", processor: "AMD Ryzen 5 5600", bootTime: "2026-03-01T09:00:00Z", antivirus: false, firewall: true, lastSeen: "2026-03-02T14:25:00Z", online: true, riskLevel: 45, department: "Library" },
  { id: "HOST-004", name: "CSE-LAB-PC02", ip: "192.168.1.104", mac: "AA:BB:CC:DD:EE:04", os: "Windows 11 Pro", osVersion: "23H2", arch: "x86_64", processor: "Intel i7-12700", bootTime: "2026-03-02T08:20:00Z", antivirus: true, firewall: false, lastSeen: "2026-03-02T14:15:00Z", online: true, riskLevel: 68, department: "CSE Lab" },
  { id: "HOST-005", name: "EXAM-SERVER", ip: "192.168.1.105", mac: "AA:BB:CC:DD:EE:05", os: "Windows Server 2022", osVersion: "21H2", arch: "x86_64", processor: "Intel Xeon E-2334", bootTime: "2026-02-28T06:00:00Z", antivirus: true, firewall: true, lastSeen: "2026-03-02T14:32:00Z", online: true, riskLevel: 12, department: "Exam Cell" },
  { id: "HOST-006", name: "HR-PC01", ip: "192.168.1.106", mac: "AA:BB:CC:DD:EE:06", os: "Windows 10 Pro", osVersion: "21H2", arch: "x86_64", processor: "Intel i3-10100", bootTime: "2026-03-02T09:00:00Z", antivirus: true, firewall: true, lastSeen: "2026-03-01T18:00:00Z", online: false, riskLevel: 35, department: "HR Office" },
  { id: "HOST-007", name: "FINANCE-PC01", ip: "192.168.1.107", mac: "AA:BB:CC:DD:EE:07", os: "Windows 11 Pro", osVersion: "23H2", arch: "x86_64", processor: "Intel i5-13400", bootTime: "2026-03-02T08:30:00Z", antivirus: true, firewall: true, lastSeen: "2026-03-02T14:29:00Z", online: true, riskLevel: 18, department: "Finance" },
  { id: "HOST-008", name: "CSE-LAB-PC03", ip: "192.168.1.108", mac: "AA:BB:CC:DD:EE:08", os: "Windows 11 Pro", osVersion: "22H2", arch: "x86_64", processor: "Intel i7-11700", bootTime: "2026-03-02T08:10:00Z", antivirus: false, firewall: false, lastSeen: "2026-03-02T13:00:00Z", online: true, riskLevel: 82, department: "CSE Lab" },
  { id: "HOST-009", name: "PRINCIPAL-PC", ip: "192.168.1.109", mac: "AA:BB:CC:DD:EE:09", os: "macOS Ventura", osVersion: "13.6", arch: "arm64", processor: "Apple M2", bootTime: "2026-03-02T08:00:00Z", antivirus: true, firewall: true, lastSeen: "2026-03-02T14:31:00Z", online: true, riskLevel: 8, department: "Admin Office" },
  { id: "HOST-010", name: "MECH-LAB-PC01", ip: "192.168.1.110", mac: "AA:BB:CC:DD:EE:10", os: "Windows 10 Pro", osVersion: "20H2", arch: "x86_64", processor: "Intel i5-10400", bootTime: "2026-03-01T07:00:00Z", antivirus: true, firewall: true, lastSeen: "2026-03-01T17:30:00Z", online: false, riskLevel: 42, department: "Mech Lab" },
  { id: "HOST-011", name: "ECE-LAB-PC01", ip: "192.168.1.111", mac: "AA:BB:CC:DD:EE:11", os: "Ubuntu 20.04", osVersion: "20.04.6", arch: "x86_64", processor: "AMD Ryzen 3 3300X", bootTime: "2026-03-02T08:45:00Z", antivirus: false, firewall: true, lastSeen: "2026-03-02T14:20:00Z", online: true, riskLevel: 55, department: "ECE Lab" },
  { id: "HOST-012", name: "SERVER-ROOM-01", ip: "192.168.1.200", mac: "AA:BB:CC:DD:EE:12", os: "CentOS 8", osVersion: "8.5", arch: "x86_64", processor: "Intel Xeon Gold 5318Y", bootTime: "2026-01-15T00:00:00Z", antivirus: true, firewall: true, lastSeen: "2026-03-02T14:33:00Z", online: true, riskLevel: 10, department: "Server Room" },
  { id: "HOST-013", name: "CSE-LAB-PC04", ip: "192.168.1.112", mac: "AA:BB:CC:DD:EE:13", os: "Windows 11 Pro", osVersion: "23H2", arch: "x86_64", processor: "Intel i7-13700", bootTime: "2026-03-02T08:05:00Z", antivirus: true, firewall: true, lastSeen: "2026-03-02T14:35:00Z", online: true, riskLevel: 15, department: "CSE Lab" },
  { id: "HOST-014", name: "CSE-LAB-PC05", ip: "192.168.1.113", mac: "AA:BB:CC:DD:EE:14", os: "Windows 11 Pro", osVersion: "23H2", arch: "x86_64", processor: "Intel i5-12400", bootTime: "2026-03-02T08:12:00Z", antivirus: true, firewall: true, lastSeen: "2026-03-02T14:30:00Z", online: true, riskLevel: 20, department: "CSE Lab" },
  { id: "HOST-015", name: "HR-PC02", ip: "192.168.1.114", mac: "AA:BB:CC:DD:EE:15", os: "Windows 11 Pro", osVersion: "23H2", arch: "x86_64", processor: "Intel i5-13400", bootTime: "2026-03-02T08:45:00Z", antivirus: true, firewall: true, lastSeen: "2026-03-02T14:28:00Z", online: true, riskLevel: 12, department: "HR Office" },
  { id: "HOST-016", name: "LIB-PC02", ip: "192.168.1.115", mac: "AA:BB:CC:DD:EE:16", os: "Windows 10 Pro", osVersion: "22H2", arch: "x86_64", processor: "Intel i3-12100", bootTime: "2026-03-02T09:00:00Z", antivirus: true, firewall: true, lastSeen: "2026-03-02T14:25:00Z", online: true, riskLevel: 25, department: "Library" },
  { id: "HOST-017", name: "MECH-LAB-PC02", ip: "192.168.1.116", mac: "AA:BB:CC:DD:EE:17", os: "Windows 10 Pro", osVersion: "22H2", arch: "x86_64", processor: "Intel i5-11400", bootTime: "2026-03-02T07:30:00Z", antivirus: true, firewall: true, lastSeen: "2026-03-02T14:20:00Z", online: true, riskLevel: 30, department: "Mech Lab" },
  { id: "HOST-018", name: "ECE-LAB-PC02", ip: "192.168.1.117", mac: "AA:BB:CC:DD:EE:18", os: "Ubuntu 22.04", osVersion: "22.04.3", arch: "x86_64", processor: "AMD Ryzen 5 5500", bootTime: "2026-03-02T08:30:00Z", antivirus: true, firewall: true, lastSeen: "2026-03-02T14:15:00Z", online: true, riskLevel: 28, department: "ECE Lab" },
  { id: "HOST-019", name: "RECEPTION-PC", ip: "192.168.1.118", mac: "AA:BB:CC:DD:EE:19", os: "Windows 11 Home", osVersion: "23H2", arch: "x86_64", processor: "Intel i3-12100", bootTime: "2026-03-02T08:00:00Z", antivirus: true, firewall: true, lastSeen: "2026-03-02T14:32:00Z", online: true, riskLevel: 18, department: "Admin Office" },
  { id: "HOST-020", name: "CAFETERIA-POS", ip: "192.168.1.119", mac: "AA:BB:CC:DD:EE:20", os: "Windows 10 IoT", osVersion: "21H2", arch: "x86_64", processor: "Intel Celeron", bootTime: "2026-03-02T06:00:00Z", antivirus: true, firewall: true, lastSeen: "2026-03-02T14:30:00Z", online: true, riskLevel: 22, department: "Cafeteria" },
]

export const mockAlerts = [
  { id: "ALT-001", timestamp: "2026-03-02T14:25:00Z", device: "CSE-LAB-PC03", type: "Brute Force Attempt", severity: "critical", description: "15 failed login attempts detected in 2 minutes from IP 192.168.1.50", status: "open", sourceIP: "192.168.1.50", targetUser: "admin", failedAttempts: 15, recommendation: "Block source IP immediately and reset admin credentials" },
  { id: "ALT-002", timestamp: "2026-03-02T14:20:00Z", device: "CSE-LAB-PC02", type: "Firewall Disabled", severity: "high", description: "Windows Firewall has been disabled on this device", status: "investigating", user: "student02", recommendation: "Re-enable firewall and audit user permissions" },
  { id: "ALT-003", timestamp: "2026-03-02T14:15:00Z", device: "LIB-PC01", type: "Malicious Hash Detected", severity: "critical", description: "File matches known malicious hash: 5d41402abc4b2a76b971...", status: "open", filePath: "/tmp/payload.bin", hash: "5d41402abc4b2a76b9719d911017c592", hashType: "MD5", recommendation: "Quarantine file immediately and run full system scan" },
  { id: "ALT-004", timestamp: "2026-03-02T13:50:00Z", device: "CSE-LAB-PC03", type: "Unauthorized Driver", severity: "high", description: "New unsigned driver installed: USBMon.sys", status: "open", driverName: "USBMon.sys", driverPath: "C:\\Windows\\System32\\drivers\\USBMon.sys", recommendation: "Remove unsigned driver and investigate source" },
  { id: "ALT-005", timestamp: "2026-03-02T13:30:00Z", device: "HR-PC01", type: "After Hours Login", severity: "medium", description: "Login detected at 02:15 AM outside business hours", status: "resolved", user: "unknown", loginTime: "02:15:00", recommendation: "Verify with HR department if authorized access" },
  { id: "ALT-006", timestamp: "2026-03-02T13:10:00Z", device: "MECH-LAB-PC01", type: "Suspicious Port", severity: "medium", description: "Port 4444 detected open - commonly used by exploits", status: "investigating", port: 4444, service: "Unknown", recommendation: "Close port and scan for malware" },
  { id: "ALT-007", timestamp: "2026-03-02T12:45:00Z", device: "ECE-LAB-PC01", type: "Antivirus Disabled", severity: "high", description: "No antivirus detected on endpoint", status: "open", recommendation: "Install and configure endpoint protection immediately" },
  { id: "ALT-008", timestamp: "2026-03-02T12:30:00Z", device: "CSE-LAB-PC01", type: "USB Device", severity: "low", description: "Unknown USB device connected: Kingston DT 32GB", status: "resolved", usbName: "Kingston DataTraveler 32GB", recommendation: "Verify device ownership with user" },
  { id: "ALT-009", timestamp: "2026-03-02T11:15:00Z", device: "FINANCE-PC01", type: "File Modification", severity: "medium", description: "Critical file modified: C:\\Windows\\System32\\config\\SAM", status: "investigating", filePath: "C:\\Windows\\System32\\config\\SAM", user: "Administrator", recommendation: "Check for unauthorized access and restore from backup if needed" },
  { id: "ALT-010", timestamp: "2026-03-02T10:00:00Z", device: "ADMIN-PC01", type: "Outdated OS", severity: "low", description: "Operating system version is outdated: Win10 22H2", status: "open", currentVersion: "22H2", latestVersion: "23H2", recommendation: "Schedule OS update during maintenance window" },
  { id: "ALT-011", timestamp: "2026-03-02T09:45:00Z", device: "SERVER-ROOM-01", type: "Multiple SSH Failures", severity: "critical", description: "25 failed SSH login attempts from external IP 203.0.113.45", status: "open", sourceIP: "203.0.113.45", failedAttempts: 25, recommendation: "Block external IP at firewall and enable fail2ban" },
  { id: "ALT-012", timestamp: "2026-03-02T09:30:00Z", device: "PRINCIPAL-PC", type: "Privilege Escalation", severity: "critical", description: "User attempted to elevate privileges without authorization", status: "investigating", user: "guest_user", targetPrivilege: "Administrator", recommendation: "Disable user account and investigate intent" },
  { id: "ALT-013", timestamp: "2026-03-02T09:15:00Z", device: "EXAM-SERVER", type: "Database Access", severity: "high", description: "Unusual database query accessing student records", status: "open", query: "SELECT * FROM students WHERE grade='A'", user: "db_readonly", recommendation: "Review database access logs and verify authorized access" },
  { id: "ALT-014", timestamp: "2026-03-02T08:50:00Z", device: "CSE-LAB-PC01", type: "Ransomware Indicator", severity: "critical", description: "Multiple file extensions changed to .encrypted in Documents folder", status: "open", affectedFiles: 47, recommendation: "Isolate system immediately and initiate incident response" },
  { id: "ALT-015", timestamp: "2026-03-02T08:30:00Z", device: "LIB-PC01", type: "Data Exfiltration", severity: "high", description: "Large data transfer detected to external IP (2.5GB)", status: "investigating", destinationIP: "45.33.32.156", dataSize: "2.5 GB", recommendation: "Block destination IP and analyze transferred data" },
  { id: "ALT-016", timestamp: "2026-03-02T08:00:00Z", device: "HR-PC01", type: "Sensitive File Access", severity: "medium", description: "Employee salary spreadsheet accessed outside HR hours", status: "open", filePath: "C:\\HR\\Payroll\\salaries_2026.xlsx", user: "temp_user", recommendation: "Review access permissions for temp users" },
  { id: "ALT-017", timestamp: "2026-03-02T07:45:00Z", device: "FINANCE-PC01", type: "Crypto Mining", severity: "high", description: "High CPU usage detected with crypto mining signature", status: "open", cpuUsage: "95%", processName: "svchost_miner.exe", recommendation: "Terminate process and scan for additional malware" },
  { id: "ALT-018", timestamp: "2026-03-02T07:30:00Z", device: "ECE-LAB-PC01", type: "Network Scan", severity: "medium", description: "Port scanning activity detected from this device", status: "investigating", scannedPorts: "1-10000", targetRange: "192.168.1.0/24", recommendation: "Investigate if authorized penetration testing" },
  { id: "ALT-019", timestamp: "2026-03-01T23:15:00Z", device: "ADMIN-PC01", type: "Remote Access", severity: "low", description: "TeamViewer session established from unknown ID", status: "resolved", remoteID: "1234567890", duration: "15 minutes", recommendation: "Verify with user if session was authorized" },
  { id: "ALT-020", timestamp: "2026-03-01T22:00:00Z", device: "CSE-LAB-PC02", type: "Registry Modification", severity: "medium", description: "Critical registry key modified: Run on startup", status: "open", registryKey: "HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Run", value: "malware.exe", recommendation: "Remove registry entry and delete associated file" },
]

export const mockFileChanges = [
  { path: "C:\\Windows\\System32\\drivers\\etc\\hosts", action: "Modified", user: "SYSTEM", device: "CSE-LAB-PC03", timestamp: "2026-03-02T14:10:00Z", critical: true },
  { path: "/etc/passwd", action: "Modified", user: "root", device: "LIB-PC01", timestamp: "2026-03-02T13:55:00Z", critical: true },
  { path: "C:\\Windows\\System32\\config\\SAM", action: "Modified", user: "Administrator", device: "FINANCE-PC01", timestamp: "2026-03-02T11:15:00Z", critical: true },
  { path: "C:\\Users\\student\\Desktop\\project.zip", action: "Created", user: "student", device: "CSE-LAB-PC01", timestamp: "2026-03-02T10:30:00Z", critical: false },
  { path: "/var/log/auth.log", action: "Modified", user: "syslog", device: "ECE-LAB-PC01", timestamp: "2026-03-02T09:45:00Z", critical: false },
  { path: "C:\\Program Files\\NewApp\\config.ini", action: "Created", user: "admin", device: "ADMIN-PC01", timestamp: "2026-03-02T09:20:00Z", critical: false },
  { path: "C:\\Windows\\Temp\\suspicious.exe", action: "Created", user: "SYSTEM", device: "CSE-LAB-PC03", timestamp: "2026-03-02T08:55:00Z", critical: true },
  { path: "/home/user/.ssh/authorized_keys", action: "Modified", user: "user", device: "LIB-PC01", timestamp: "2026-03-02T08:30:00Z", critical: true },
  { path: "C:\\Users\\hr\\Documents\\payroll.xlsx", action: "Deleted", user: "hr_admin", device: "HR-PC01", timestamp: "2026-03-01T16:45:00Z", critical: false },
  { path: "C:\\Windows\\System32\\drivers\\USBMon.sys", action: "Created", user: "SYSTEM", device: "CSE-LAB-PC03", timestamp: "2026-03-01T15:20:00Z", critical: true },
]

export const mockLoginActivity = [
  { user: "admin", device: "ADMIN-PC01", timestamp: "2026-03-02T08:00:00Z", success: true, afterHours: false },
  { user: "student01", device: "CSE-LAB-PC01", timestamp: "2026-03-02T09:15:00Z", success: true, afterHours: false },
  { user: "attacker", device: "CSE-LAB-PC03", timestamp: "2026-03-02T14:20:00Z", success: false, afterHours: false },
  { user: "attacker", device: "CSE-LAB-PC03", timestamp: "2026-03-02T14:20:05Z", success: false, afterHours: false },
  { user: "attacker", device: "CSE-LAB-PC03", timestamp: "2026-03-02T14:20:10Z", success: false, afterHours: false },
  { user: "attacker", device: "CSE-LAB-PC03", timestamp: "2026-03-02T14:20:15Z", success: false, afterHours: false },
  { user: "unknown", device: "HR-PC01", timestamp: "2026-03-02T02:15:00Z", success: true, afterHours: true },
  { user: "librarian", device: "LIB-PC01", timestamp: "2026-03-02T08:45:00Z", success: true, afterHours: false },
  { user: "root", device: "SERVER-ROOM-01", timestamp: "2026-03-02T06:00:00Z", success: true, afterHours: false },
  { user: "student02", device: "CSE-LAB-PC02", timestamp: "2026-03-02T09:30:00Z", success: true, afterHours: false },
  { user: "finance_user", device: "FINANCE-PC01", timestamp: "2026-03-02T08:30:00Z", success: true, afterHours: false },
  { user: "hacker", device: "ECE-LAB-PC01", timestamp: "2026-03-02T03:00:00Z", success: false, afterHours: true },
]

export const mockUSBDevices = [
  { device: "CSE-LAB-PC01", usbName: "Kingston DataTraveler 32GB", timestamp: "2026-03-02T10:25:00Z", known: true },
  { device: "CSE-LAB-PC03", usbName: "Unknown USB Mass Storage", timestamp: "2026-03-02T13:45:00Z", known: false },
  { device: "ADMIN-PC01", usbName: "Logitech Wireless Receiver", timestamp: "2026-03-02T08:05:00Z", known: true },
  { device: "HR-PC01", usbName: "SanDisk Ultra 64GB", timestamp: "2026-03-01T15:30:00Z", known: true },
  { device: "FINANCE-PC01", usbName: "Unknown HID Device", timestamp: "2026-03-02T11:00:00Z", known: false },
]

export const mockOpenPorts = [
  { device: "CSE-LAB-PC01", port: 80, service: "HTTP", suspicious: false },
  { device: "CSE-LAB-PC01", port: 443, service: "HTTPS", suspicious: false },
  { device: "CSE-LAB-PC03", port: 4444, service: "Unknown", suspicious: true },
  { device: "CSE-LAB-PC03", port: 22, service: "SSH", suspicious: false },
  { device: "CSE-LAB-PC03", port: 3389, service: "RDP", suspicious: true },
  { device: "LIB-PC01", port: 8080, service: "HTTP Alt", suspicious: false },
  { device: "ECE-LAB-PC01", port: 5555, service: "Unknown", suspicious: true },
  { device: "SERVER-ROOM-01", port: 443, service: "HTTPS", suspicious: false },
  { device: "SERVER-ROOM-01", port: 3306, service: "MySQL", suspicious: false },
  { device: "MECH-LAB-PC01", port: 4444, service: "Unknown", suspicious: true },
]

export const mockDrivers = [
  { device: "CSE-LAB-PC01", name: "NVIDIA GeForce RTX 3060", version: "537.58", date: "2026-02-15", newlyAdded: false },
  { device: "CSE-LAB-PC03", name: "USBMon.sys", version: "1.0.0", date: "2026-03-01", newlyAdded: true },
  { device: "ADMIN-PC01", name: "Intel WiFi 6 AX201", version: "22.230.0", date: "2026-01-10", newlyAdded: false },
  { device: "CSE-LAB-PC02", name: "Realtek Audio HD", version: "6.0.9285.1", date: "2026-02-20", newlyAdded: false },
  { device: "ECE-LAB-PC01", name: "rtl8821ce", version: "5.15.0", date: "2026-03-02", newlyAdded: true },
  { device: "HR-PC01", name: "HP LaserJet Driver", version: "49.5.4586", date: "2026-01-05", newlyAdded: false },
]

export const mockMaliciousHashes = [
  { hash: "5d41402abc4b2a76b9719d911017c592", type: "MD5", addedDate: "2026-02-28", source: "VirusTotal" },
  { hash: "aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d", type: "SHA1", addedDate: "2026-03-01", source: "Manual Upload" },
  { hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", type: "SHA256", addedDate: "2026-03-02", source: "Threat Intel Feed" },
  { hash: "d8e8fca2dc0f896fd7cb4cb0031ba249", type: "MD5", addedDate: "2026-02-25", source: "VirusTotal" },
  { hash: "7c222fb2927d828af22f592134e8932480637c0d", type: "SHA1", addedDate: "2026-02-20", source: "Internal Analysis" },
]

export const mockDepartments = [
  { name: "CSE Lab", devices: 3, compliant: 1, nonCompliant: 2 },
  { name: "Admin Office", devices: 2, compliant: 2, nonCompliant: 0 },
  { name: "Library", devices: 1, compliant: 0, nonCompliant: 1 },
  { name: "Exam Cell", devices: 1, compliant: 1, nonCompliant: 0 },
  { name: "HR Office", devices: 1, compliant: 1, nonCompliant: 0 },
  { name: "Finance", devices: 1, compliant: 1, nonCompliant: 0 },
  { name: "ECE Lab", devices: 1, compliant: 0, nonCompliant: 1 },
  { name: "Mech Lab", devices: 1, compliant: 0, nonCompliant: 1 },
  { name: "Server Room", devices: 1, compliant: 1, nonCompliant: 0 },
]

export const mockLoginChartData = [
  { date: "Feb 24", success: 45, failed: 3 },
  { date: "Feb 25", success: 52, failed: 5 },
  { date: "Feb 26", success: 48, failed: 2 },
  { date: "Feb 27", success: 55, failed: 8 },
  { date: "Feb 28", success: 50, failed: 4 },
  { date: "Mar 01", success: 42, failed: 12 },
  { date: "Mar 02", success: 38, failed: 18 },
]

export const mockFileChangeChartData = [
  { date: "Feb 24", changes: 12 },
  { date: "Feb 25", changes: 8 },
  { date: "Feb 26", changes: 15 },
  { date: "Feb 27", changes: 22 },
  { date: "Feb 28", changes: 10 },
  { date: "Mar 01", changes: 18 },
  { date: "Mar 02", changes: 25 },
]

export const mockUSBChartData = [
  { date: "Feb 24", insertions: 5 },
  { date: "Feb 25", insertions: 3 },
  { date: "Feb 26", insertions: 7 },
  { date: "Feb 27", insertions: 4 },
  { date: "Feb 28", insertions: 6 },
  { date: "Mar 01", insertions: 8 },
  { date: "Mar 02", insertions: 5 },
]

export const mockAlertTrendData = [
  { date: "Feb 24", critical: 1, high: 2, medium: 3, low: 4 },
  { date: "Feb 25", critical: 0, high: 3, medium: 2, low: 5 },
  { date: "Feb 26", critical: 2, high: 1, medium: 4, low: 3 },
  { date: "Feb 27", critical: 1, high: 4, medium: 2, low: 2 },
  { date: "Feb 28", critical: 3, high: 2, medium: 5, low: 1 },
  { date: "Mar 01", critical: 2, high: 3, medium: 3, low: 4 },
  { date: "Mar 02", critical: 3, high: 4, medium: 2, low: 3 },
]

export const mockDeviceHealthData = [
  { name: "Healthy", value: 5, fill: "#10b981" },
  { name: "At Risk", value: 4, fill: "#f59e0b" },
  { name: "Critical", value: 2, fill: "#ef4444" },
  { name: "Offline", value: 2, fill: "#64748b" },
]

export const mockRiskTrendData = [
  { date: "Feb 24", score: 35 },
  { date: "Feb 25", score: 38 },
  { date: "Feb 26", score: 42 },
  { date: "Feb 27", score: 45 },
  { date: "Feb 28", score: 50 },
  { date: "Mar 01", score: 55 },
  { date: "Mar 02", score: 58 },
]

export const mockDatabaseLogs = [
  { id: 1, device: "CSE-LAB-PC03", timestamp: "2026-03-02T14:25:00Z", data: { host_id: "HOST-008", event: "brute_force_detected", failed_attempts: 15, source_ip: "192.168.1.108", target_user: "admin" } },
  { id: 2, device: "CSE-LAB-PC02", timestamp: "2026-03-02T14:20:00Z", data: { host_id: "HOST-004", event: "firewall_disabled", service: "Windows Firewall", user: "SYSTEM" } },
  { id: 3, device: "LIB-PC01", timestamp: "2026-03-02T14:15:00Z", data: { host_id: "HOST-003", event: "malicious_hash_match", file: "/tmp/payload.bin", hash: "5d41402abc4b2a76b9719d911017c592" } },
  { id: 4, device: "FINANCE-PC01", timestamp: "2026-03-02T11:15:00Z", data: { host_id: "HOST-007", event: "file_modified", path: "C:\\Windows\\System32\\config\\SAM", user: "Administrator" } },
  { id: 5, device: "HR-PC01", timestamp: "2026-03-02T02:15:00Z", data: { host_id: "HOST-006", event: "after_hours_login", user: "unknown", login_time: "02:15:00" } },
]
