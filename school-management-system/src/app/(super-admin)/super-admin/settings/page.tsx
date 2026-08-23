"use client";

import { AppShell } from "@/components/layout/app-shell";
import { PlaceholderPage } from "@/components/shared/placeholder-page";

export default function SuperAdminSettingsPage() {
  return (
    <AppShell>
      <PlaceholderPage
        title="System Settings"
        description="Configure system-wide settings for the platform"
      />
    </AppShell>
  );
}
