export interface UserData {
  id: string
  name: string
  email: string
  company: string
  role: string
  verified: boolean
  lastLogin: string
  memberSince: string
}

export interface Application {
  id: string
  applicationId: string
  productName: string
  category: string
  status: string
  submittedDate: string
  lastUpdated: string
}

export interface DashboardStats {
  title: string
  value: string
  change: string
  icon: any
  trend: "up" | "down" | "warning"
}

export interface TimelineStep {
  status: string
  date: string
  completed: boolean
  current: boolean
  description?: string
  documents?: string[]
  reviewer?: string
  comments?: string
}

export interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  time: string
  read: boolean
}

export interface NavItem {
  label: string
  icon: any
  href: string
  description: string
  badge?: string
  badgeColor?: string
  disabled?: boolean
}
