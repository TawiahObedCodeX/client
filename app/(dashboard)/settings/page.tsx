// ─────────────────────────────────────────────────
// app/(dashboard)/settings/page.tsx
// Application Settings Page
// Version: 2026.1.0
// ─────────────────────────────────────────────────

"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Settings,
  Bell,
  Moon,
  Sun,
  Globe,
  Lock,
  Eye,
  EyeOff,
  Mail,
  Smartphone,
  Monitor,
  Volume2,
  VolumeX,
  Palette,
  Languages,
  Shield,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Save,
} from "lucide-react"
import { toast } from "sonner"

// ─────────────────────────────────────────────────
// Type Definitions
// ─────────────────────────────────────────────────
interface NotificationSettings {
  emailNotifications: boolean
  pushNotifications: boolean
  smsNotifications: boolean
  applicationUpdates: boolean
  marketingEmails: boolean
  securityAlerts: boolean
  weeklyDigest: boolean
}

interface AppearanceSettings {
  theme: "light" | "dark" | "system"
  fontSize: "small" | "medium" | "large"
  language: string
  compactMode: boolean
}

interface PrivacySettings {
  showProfile: boolean
  showEmail: boolean
  showActivity: boolean
  dataCollection: boolean
}

// ─────────────────────────────────────────────────
// Initial Settings
// ─────────────────────────────────────────────────
const initialNotifications: NotificationSettings = {
  emailNotifications: true,
  pushNotifications: true,
  smsNotifications: false,
  applicationUpdates: true,
  marketingEmails: false,
  securityAlerts: true,
  weeklyDigest: true,
}

const initialAppearance: AppearanceSettings = {
  theme: "light",
  fontSize: "medium",
  language: "en",
  compactMode: false,
}

const initialPrivacy: PrivacySettings = {
  showProfile: true,
  showEmail: false,
  showActivity: true,
  dataCollection: true,
}

// ─────────────────────────────────────────────────
// Settings Page Component
// ─────────────────────────────────────────────────
export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<
    "notifications" | "appearance" | "privacy" | "language"
  >("notifications")

  const [notifications, setNotifications] = useState<NotificationSettings>(initialNotifications)
  const [appearance, setAppearance] = useState<AppearanceSettings>(initialAppearance)
  const [privacy, setPrivacy] = useState<PrivacySettings>(initialPrivacy)
  const [isSaving, setIsSaving] = useState(false)

  // Handle notification toggle
  const handleNotificationChange = (key: keyof NotificationSettings) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  // Handle appearance change
  const handleAppearanceChange = (key: keyof AppearanceSettings, value: any) => {
    setAppearance((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  // Handle privacy change
  const handlePrivacyChange = (key: keyof PrivacySettings) => {
    setPrivacy((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  // Save all settings
  const handleSaveAll = async () => {
    setIsSaving(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      toast.success("All settings saved successfully!")
    } catch (error) {
      toast.error("Failed to save settings")
    } finally {
      setIsSaving(false)
    }
  }

  // ─────────────────────────────────────────────────
  // Toggle Switch Component
  // ─────────────────────────────────────────────────
  const ToggleSwitch = ({
    checked,
    onChange,
    disabled = false,
  }: {
    checked: boolean
    onChange: () => void
    disabled?: boolean
  }) => (
    <button
      onClick={onChange}
      disabled={disabled}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2 ${
        checked ? "bg-[#2563EB]" : "bg-slate-300"
      } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      role="switch"
      aria-checked={checked}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  )

  // ─────────────────────────────────────────────────
  // Settings Section Component
  // ─────────────────────────────────────────────────
  const SettingItem = ({
    icon: Icon,
    title,
    description,
    children,
  }: {
    icon: any
    title: string
    description: string
    children: React.ReactNode
  }) => (
    <div className="flex items-center justify-between py-4 border-b border-slate-100 last:border-b-0">
      <div className="flex items-start gap-3 flex-1">
        <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0">
          <Icon className="w-5 h-5 text-slate-600" />
        </div>
        <div>
          <p className="font-medium text-[#0F172A]">{title}</p>
          <p className="text-sm text-slate-500">{description}</p>
        </div>
      </div>
      <div className="ml-4 flex-shrink-0">{children}</div>
    </div>
  )

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0F172A]">Settings</h1>
        <p className="text-slate-500 mt-1">
          Configure your application settings and preferences
        </p>
      </div>

      {/* Settings Navigation */}
      <div className="flex gap-1 mb-6 bg-slate-100 rounded-xl p-1 w-fit flex-wrap">
        <button
          onClick={() => setActiveSection("notifications")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeSection === "notifications"
              ? "bg-white text-[#0F172A] shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          <Bell className="w-4 h-4 inline mr-2" />
          Notifications
        </button>
        <button
          onClick={() => setActiveSection("appearance")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeSection === "appearance"
              ? "bg-white text-[#0F172A] shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          <Palette className="w-4 h-4 inline mr-2" />
          Appearance
        </button>
        <button
          onClick={() => setActiveSection("privacy")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeSection === "privacy"
              ? "bg-white text-[#0F172A] shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          <Lock className="w-4 h-4 inline mr-2" />
          Privacy
        </button>
        <button
          onClick={() => setActiveSection("language")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeSection === "language"
              ? "bg-white text-[#0F172A] shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          <Languages className="w-4 h-4 inline mr-2" />
          Language
        </button>
      </div>

      {/* Notifications Section */}
      {activeSection === "notifications" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-[#2563EB]" />
              Notification Preferences
            </CardTitle>
            <CardDescription>
              Choose how and when you want to be notified
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SettingItem
              icon={Mail}
              title="Email Notifications"
              description="Receive notifications via email"
            >
              <ToggleSwitch
                checked={notifications.emailNotifications}
                onChange={() => handleNotificationChange("emailNotifications")}
              />
            </SettingItem>

            <SettingItem
              icon={Smartphone}
              title="Push Notifications"
              description="Receive push notifications in your browser"
            >
              <ToggleSwitch
                checked={notifications.pushNotifications}
                onChange={() => handleNotificationChange("pushNotifications")}
              />
            </SettingItem>

            <SettingItem
              icon={Monitor}
              title="SMS Notifications"
              description="Receive text message notifications"
            >
              <ToggleSwitch
                checked={notifications.smsNotifications}
                onChange={() => handleNotificationChange("smsNotifications")}
              />
            </SettingItem>

            <SettingItem
              icon={AlertCircle}
              title="Application Updates"
              description="Get notified about application status changes"
            >
              <ToggleSwitch
                checked={notifications.applicationUpdates}
                onChange={() => handleNotificationChange("applicationUpdates")}
              />
            </SettingItem>

            <SettingItem
              icon={Bell}
              title="Security Alerts"
              description="Receive alerts about account security"
            >
              <ToggleSwitch
                checked={notifications.securityAlerts}
                onChange={() => handleNotificationChange("securityAlerts")}
                disabled
              />
            </SettingItem>

            <SettingItem
              icon={Mail}
              title="Weekly Digest"
              description="Receive a weekly summary of activities"
            >
              <ToggleSwitch
                checked={notifications.weeklyDigest}
                onChange={() => handleNotificationChange("weeklyDigest")}
              />
            </SettingItem>

            <SettingItem
              icon={Mail}
              title="Marketing Emails"
              description="Receive marketing and promotional emails"
            >
              <ToggleSwitch
                checked={notifications.marketingEmails}
                onChange={() => handleNotificationChange("marketingEmails")}
              />
            </SettingItem>
          </CardContent>
        </Card>
      )}

      {/* Appearance Section */}
      {activeSection === "appearance" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-[#2563EB]" />
              Appearance Settings
            </CardTitle>
            <CardDescription>
              Customize how the application looks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SettingItem
              icon={appearance.theme === "light" ? Sun : Moon}
              title="Theme"
              description="Choose your preferred theme"
            >
              <div className="flex gap-2">
                {(["light", "dark", "system"] as const).map((theme) => (
                  <button
                    key={theme}
                    onClick={() => handleAppearanceChange("theme", theme)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      appearance.theme === theme
                        ? "bg-[#2563EB] text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {theme.charAt(0).toUpperCase() + theme.slice(1)}
                  </button>
                ))}
              </div>
            </SettingItem>

            <SettingItem
              icon={Eye}
              title="Font Size"
              description="Adjust the text size"
            >
              <div className="flex gap-2">
                {(["small", "medium", "large"] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => handleAppearanceChange("fontSize", size)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      appearance.fontSize === size
                        ? "bg-[#2563EB] text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {size.charAt(0).toUpperCase() + size.slice(1)}
                  </button>
                ))}
              </div>
            </SettingItem>

            <SettingItem
              icon={Monitor}
              title="Compact Mode"
              description="Reduce spacing for a denser layout"
            >
              <ToggleSwitch
                checked={appearance.compactMode}
                onChange={() =>
                  handleAppearanceChange("compactMode", !appearance.compactMode)
                }
              />
            </SettingItem>
          </CardContent>
        </Card>
      )}

      {/* Privacy Section */}
      {activeSection === "privacy" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-[#2563EB]" />
              Privacy Settings
            </CardTitle>
            <CardDescription>
              Manage your privacy and data preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SettingItem
              icon={Eye}
              title="Show Profile"
              description="Allow others to see your profile information"
            >
              <ToggleSwitch
                checked={privacy.showProfile}
                onChange={() => handlePrivacyChange("showProfile")}
              />
            </SettingItem>

            <SettingItem
              icon={Mail}
              title="Show Email"
              description="Display your email address to other users"
            >
              <ToggleSwitch
                checked={privacy.showEmail}
                onChange={() => handlePrivacyChange("showEmail")}
              />
            </SettingItem>

            <SettingItem
              icon={Clock}
              title="Show Activity"
              description="Allow others to see your activity status"
            >
              <ToggleSwitch
                checked={privacy.showActivity}
                onChange={() => handlePrivacyChange("showActivity")}
              />
            </SettingItem>

            <SettingItem
              icon={Shield}
              title="Data Collection"
              description="Allow anonymous usage data collection to improve the platform"
            >
              <ToggleSwitch
                checked={privacy.dataCollection}
                onChange={() => handlePrivacyChange("dataCollection")}
              />
            </SettingItem>
          </CardContent>
        </Card>
      )}

      {/* Language Section */}
      {activeSection === "language" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Languages className="w-5 h-5 text-[#2563EB]" />
              Language & Region
            </CardTitle>
            <CardDescription>
              Set your preferred language and regional settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SettingItem
              icon={Globe}
              title="Display Language"
              description="Choose the language for the application interface"
            >
              <select
                value={appearance.language}
                onChange={(e) => handleAppearanceChange("language", e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-[#2563EB] bg-white"
              >
                <option value="en">English</option>
                <option value="fr">Français</option>
                <option value="pt">Português</option>
                <option value="ar">العربية</option>
                <option value="zh">中文</option>
                <option value="tw">Twi</option>
                <option value="ga">Ga</option>
                <option value="ew">Ewe</option>
              </select>
            </SettingItem>
          </CardContent>
        </Card>
      )}

      {/* Save Button */}
      <div className="mt-8 flex justify-end">
        <Button
          onClick={handleSaveAll}
          className="bg-[#2563EB] hover:bg-[#1E40AF]"
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save All Settings
            </>
          )}
        </Button>
      </div>
    </div>
  )
}