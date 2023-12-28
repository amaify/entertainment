"use client";

import type { ReactNode } from "react";
import AppLayout from "@/components/layout/app-layout";
import Notification from "@/components/ui/notification";

export default function AppProvider({ children }: { children: ReactNode }) {
  return (
    <AppLayout>
      <Notification />
      {children}
    </AppLayout>
  );
}
