// app/(applicant)/settings/page.tsx
"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Lock, Palette, Globe } from "lucide-react";
import { showToast } from "@/components/common/Toast";

export default function SettingsPage() {
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsChangingPassword(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    showToast.success("Password Changed", "Your password has been updated successfully.");
    setIsChangingPassword(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>Manage your account preferences and security settings</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="security" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="security" className="gap-2">
                  <Lock className="w-4 h-4" /> Security
                </TabsTrigger>
                <TabsTrigger value="notifications" className="gap-2">
                  <Bell className="w-4 h-4" /> Notifications
                </TabsTrigger>
                <TabsTrigger value="preferences" className="gap-2">
                  <Globe className="w-4 h-4" /> Preferences
                </TabsTrigger>
              </TabsList>

              <TabsContent value="security" className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Change Password</h3>
                  <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
                    <div>
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" required />
                    </div>
                    <div>
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" required />
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" required />
                    </div>
                    <Button type="submit" disabled={isChangingPassword}>
                      {isChangingPassword ? "Updating..." : "Update Password"}
                    </Button>
                  </form>
                </div>

                <div className="pt-6 border-t border-slate-200">
                  <h3 className="text-lg font-semibold mb-4">Two-Factor Authentication</h3>
                  <p className="text-slate-500 text-sm mb-4">
                    Add an extra layer of security to your account by enabling two-factor authentication.
                  </p>
                  <Button variant="outline">Enable 2FA</Button>
                </div>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-slate-500">Receive updates about application status changes</p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-[#D4A017] transition-colors">
                    <span className="inline-block h-4 w-4 translate-x-1 rounded-full bg-white transition-transform" />
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                  <div>
                    <p className="font-medium">SLA Reminders</p>
                    <p className="text-sm text-slate-500">Get alerts before statutory deadlines</p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-300 transition-colors">
                    <span className="inline-block h-4 w-4 translate-x-6 rounded-full bg-white transition-transform" />
                  </button>
                </div>
              </TabsContent>

              <TabsContent value="preferences" className="space-y-4">
                <div>
                  <Label htmlFor="language">Language</Label>
                  <select id="language" className="mt-1 w-full rounded-xl border border-slate-200 p-3">
                    <option>English</option>
                    <option>French</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <select id="timezone" className="mt-1 w-full rounded-xl border border-slate-200 p-3">
                    <option>Accra (GMT+0)</option>
                    <option>London (GMT+1)</option>
                  </select>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}