"use client"

import { create } from 'zustand'
import type { UserData, Notification } from '@/types'

interface AppState {
  user: UserData | null
  isAuthenticated: boolean
  sidebarCollapsed: boolean
  notifications: Notification[]
  setUser: (user: UserData | null) => void
  setAuthenticated: (val: boolean) => void
  toggleSidebar: () => void
  setSidebarCollapsed: (val: boolean) => void
  setNotifications: (notifications: Notification[]) => void
  markNotificationRead: (id: string) => void
  logout: () => void
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  isAuthenticated: false,
  sidebarCollapsed: false,
  notifications: [],

  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setAuthenticated: (val) => set({ isAuthenticated: val }),
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setSidebarCollapsed: (val) => set({ sidebarCollapsed: val }),
  setNotifications: (notifications) => set({ notifications }),
  markNotificationRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),
  logout: () => set({ user: null, isAuthenticated: false }),
}))
