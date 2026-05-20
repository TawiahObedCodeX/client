// ─────────────────────────────────────────────────
// app/(dashboard)/profile/page.tsx
// User Profile Page with Edit Functionality
// Version: 2026.1.0
// ─────────────────────────────────────────────────

"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  User,
  Mail,
  Building2,
  Phone,
  MapPin,
  Calendar,
  Shield,
  BadgeCheck,
  Edit3,
  Save,
  X,
  Loader2,
  Camera,
  AlertCircle,
  CheckCircle2,
  Clock,
  Globe,
} from "lucide-react"
import { toast } from "sonner"

// ─────────────────────────────────────────────────
// Type Definitions
// ─────────────────────────────────────────────────
interface UserProfile {
  id: string
  name: string
  email: string
  company: string
  role: string
  verified: boolean
  phone: string
  address: string
  city: string
  region: string
  country: string
  website: string
  bio: string
  avatarUrl: string
  memberSince: string
  lastLogin: string
}

interface EditableFields {
  name: boolean
  phone: boolean
  address: boolean
  city: boolean
  region: boolean
  website: boolean
  bio: boolean
}

// ─────────────────────────────────────────────────
// Main Profile Page Component
// ─────────────────────────────────────────────────
export default function ProfilePage() {
  const fileInputRef = useRef<HTMLInputElement>(null)

  // State management
  const [profile, setProfile] = useState<UserProfile>({
    id: "",
    name: "Tawiah O.",
    email: "tawiah@example.com",
    company: "FDA Demo Company Ltd",
    role: "applicant",
    verified: true,
    phone: "+233 50 123 4567",
    address: "17 Indian Ocean Street",
    city: "Accra",
    region: "Greater Accra",
    country: "Ghana",
    website: "https://company.com",
    bio: "Regulatory affairs professional with experience in product registration and compliance management.",
    avatarUrl: "https://github.com/shadcn.png",
    memberSince: "2026-01-15",
    lastLogin: "2026-05-20T10:30:00",
  })

  const [editingFields, setEditingFields] = useState<EditableFields>({
    name: false,
    phone: false,
    address: false,
    city: false,
    region: false,
    website: false,
    bio: false,
  })

  const [isSaving, setIsSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<"profile" | "security" | "activity">("profile")

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  // Get initials for avatar
  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  // Handle field edit toggle
  const toggleEdit = (field: keyof EditableFields) => {
    setEditingFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  // Handle profile field change
  const handleChange = (field: keyof UserProfile, value: string) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Handle save
  const handleSave = async (field: keyof EditableFields) => {
    setIsSaving(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setEditingFields((prev) => ({
        ...prev,
        [field]: false,
      }))

      toast.success(`${field.charAt(0).toUpperCase() + field.slice(1)} updated successfully!`)
    } catch (error) {
      toast.error("Failed to update. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  // Handle avatar change
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In production, upload to cloud storage
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfile((prev) => ({
            ...prev,
            avatarUrl: event.target!.result as string,
          }))
          toast.success("Profile photo updated!")
        }
      }
      reader.readAsDataURL(file)
    }
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#2563EB] animate-spin mx-auto mb-4" />
          <p className="text-slate-500">Loading profile...</p>
        </div>
      </div>
    )
  }

  // ─────────────────────────────────────────────────
  // Editable Field Component
  // ─────────────────────────────────────────────────
  const EditableField = ({
    label,
    value,
    field,
    icon: Icon,
    type = "text",
  }: {
    label: string
    value: string
    field: keyof EditableFields
    icon: any
    type?: string
  }) => (
    <div className="flex items-center justify-between py-3 border-b border-slate-100 last:border-b-0">
      <div className="flex items-center gap-3 flex-1">
        <Icon className="w-4 h-4 text-slate-400 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-xs text-slate-500">{label}</p>
          {editingFields[field] ? (
            <input
              type={type}
              value={value}
              onChange={(e) => handleChange(field as keyof UserProfile, e.target.value)}
              className="w-full mt-1 px-3 py-1.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
              autoFocus
            />
          ) : (
            <p className="text-sm font-medium text-[#0F172A]">
              {value || "Not provided"}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-1 ml-4">
        {editingFields[field] ? (
          <>
            <button
              onClick={() => handleSave(field)}
              disabled={isSaving}
              className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
              title="Save"
            >
              <Save className="w-4 h-4" />
            </button>
            <button
              onClick={() => toggleEdit(field)}
              className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              title="Cancel"
            >
              <X className="w-4 h-4" />
            </button>
          </>
        ) : (
          <button
            onClick={() => toggleEdit(field)}
            className="p-1.5 text-slate-400 hover:text-[#2563EB] hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit"
          >
            <Edit3 className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0F172A]">Profile Settings</h1>
        <p className="text-slate-500 mt-1">
          Manage your account information and preferences
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-slate-100 rounded-xl p-1 w-fit">
        <button
          onClick={() => setActiveTab("profile")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === "profile"
              ? "bg-white text-[#0F172A] shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          <User className="w-4 h-4 inline mr-2" />
          Profile
        </button>
        <button
          onClick={() => setActiveTab("security")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === "security"
              ? "bg-white text-[#0F172A] shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          <Shield className="w-4 h-4 inline mr-2" />
          Security
        </button>
        <button
          onClick={() => setActiveTab("activity")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === "activity"
              ? "bg-white text-[#0F172A] shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          <Clock className="w-4 h-4 inline mr-2" />
          Activity
        </button>
      </div>

      {/* Profile Tab Content */}
      {activeTab === "profile" && (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Avatar Card */}
          <Card className="lg:col-span-1">
            <CardContent className="p-6 text-center">
              <div className="relative inline-block">
                <Avatar className="w-28 h-28 mx-auto ring-4 ring-slate-200">
                  <AvatarImage src={profile.avatarUrl} />
                  <AvatarFallback className="bg-[#2563EB] text-white text-4xl">
                    {getInitials(profile.name)}
                  </AvatarFallback>
                </Avatar>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 p-2 bg-[#2563EB] text-white rounded-full hover:bg-[#1E40AF] transition-colors shadow-md"
                  title="Change photo"
                >
                  <Camera className="w-4 h-4" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </div>

              <h3 className="text-xl font-semibold text-[#0F172A] mt-4">{profile.name}</h3>
              <p className="text-slate-500 text-sm capitalize">{profile.role}</p>

              {profile.verified && (
                <div className="inline-flex items-center gap-1 mt-2 px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  <BadgeCheck className="w-3.5 h-3.5" />
                  Verified Account
                </div>
              )}

              <div className="mt-6 space-y-2 text-left">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>Member since {new Date(profile.memberSince).toLocaleDateString("en-US", { year: "numeric", month: "long" })}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>Last login: {new Date(profile.lastLogin).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Details Card */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Update your personal and contact information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-0">
                <EditableField
                  label="Full Name"
                  value={profile.name}
                  field="name"
                  icon={User}
                />
                <div className="flex items-center justify-between py-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <div>
                      <p className="text-xs text-slate-500">Email Address</p>
                      <p className="text-sm font-medium text-[#0F172A]">{profile.email}</p>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400">Cannot be changed</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <Building2 className="w-4 h-4 text-slate-400" />
                    <div>
                      <p className="text-xs text-slate-500">Company</p>
                      <p className="text-sm font-medium text-[#0F172A]">{profile.company}</p>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400">Contact support to change</span>
                </div>
                <EditableField
                  label="Phone Number"
                  value={profile.phone}
                  field="phone"
                  icon={Phone}
                  type="tel"
                />
                <EditableField
                  label="Address"
                  value={profile.address}
                  field="address"
                  icon={MapPin}
                />
                <EditableField
                  label="City"
                  value={profile.city}
                  field="city"
                  icon={MapPin}
                />
                <EditableField
                  label="Region"
                  value={profile.region}
                  field="region"
                  icon={MapPin}
                />
                <EditableField
                  label="Website"
                  value={profile.website}
                  field="website"
                  icon={Globe}
                  type="url"
                />
              </div>
            </CardContent>
          </Card>

          {/* Bio Card */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Bio</CardTitle>
              <CardDescription>Tell us about yourself and your role</CardDescription>
            </CardHeader>
            <CardContent>
              {editingFields.bio ? (
                <div className="space-y-3">
                  <textarea
                    value={profile.bio}
                    onChange={(e) => handleChange("bio", e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none"
                    placeholder="Write a short bio..."
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="bg-[#2563EB] hover:bg-[#1E40AF]"
                      onClick={() => handleSave("bio")}
                      disabled={isSaving}
                    >
                      {isSaving ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Save className="w-4 h-4 mr-2" />
                      )}
                      Save Bio
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleEdit("bio")}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between">
                  <p className="text-slate-600">
                    {profile.bio || "No bio added yet."}
                  </p>
                  <button
                    onClick={() => toggleEdit("bio")}
                    className="p-1.5 text-slate-400 hover:text-[#2563EB] hover:bg-blue-50 rounded-lg transition-colors ml-4 flex-shrink-0"
                    title="Edit bio"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Security Tab Content */}
      {activeTab === "security" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#2563EB]" />
                Change Password
              </CardTitle>
              <CardDescription>
                Update your account password. Use a strong password you don't use elsewhere.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Current Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                    placeholder="Enter current password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                    placeholder="Enter new password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                    placeholder="Confirm new password"
                  />
                </div>
                <Button className="bg-[#2563EB] hover:bg-[#1E40AF]">
                  Update Password
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BadgeCheck className="w-5 h-5 text-green-600" />
                Two-Factor Authentication
              </CardTitle>
              <CardDescription>
                Add an extra layer of security to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between max-w-md">
                <div>
                  <p className="font-medium text-[#0F172A]">2FA is currently disabled</p>
                  <p className="text-sm text-slate-500">
                    Enable two-factor authentication for enhanced security
                  </p>
                </div>
                <Button variant="outline">Enable 2FA</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <AlertCircle className="w-5 h-5" />
                Danger Zone
              </CardTitle>
              <CardDescription>
                Irreversible actions for your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between max-w-md p-4 border border-red-200 rounded-xl bg-red-50">
                  <div>
                    <p className="font-medium text-red-700">Delete Account</p>
                    <p className="text-sm text-red-600">
                      Permanently delete your account and all data
                    </p>
                  </div>
                  <Button variant="destructive" size="sm">
                    Delete Account
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Activity Tab Content */}
      {activeTab === "activity" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#2563EB]" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Your account activity and login history
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  action: "Logged in",
                  detail: "Successful login from Chrome on Windows",
                  date: "2026-05-20 10:30 AM",
                  type: "success",
                },
                {
                  action: "Profile Updated",
                  detail: "Changed phone number",
                  date: "2026-05-18 2:15 PM",
                  type: "info",
                },
                {
                  action: "Application Submitted",
                  detail: "Submitted FDA-2026-005 for review",
                  date: "2026-05-15 9:00 AM",
                  type: "info",
                },
                {
                  action: "Document Uploaded",
                  detail: "Uploaded certificate of analysis",
                  date: "2026-05-14 4:30 PM",
                  type: "info",
                },
                {
                  action: "Password Changed",
                  detail: "Account password was updated",
                  date: "2026-05-10 11:00 AM",
                  type: "warning",
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 pb-4 border-b border-slate-100 last:border-b-0 last:pb-0"
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      activity.type === "success"
                        ? "bg-green-500"
                        : activity.type === "warning"
                        ? "bg-amber-500"
                        : "bg-blue-500"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="font-medium text-[#0F172A] text-sm">{activity.action}</p>
                    <p className="text-sm text-slate-500">{activity.detail}</p>
                  </div>
                  <span className="text-xs text-slate-400 whitespace-nowrap">
                    {activity.date}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}