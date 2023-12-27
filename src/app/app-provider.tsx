"use client";

import type { ReactNode } from "react";
import Notification from "@/components/ui/notification";
import AppLayout from "@/layout/app-layout";

export default function AppProvider({ children }: { children: ReactNode }) {
  return (
    <AppLayout>
      <Notification />
      {children}
    </AppLayout>
  );
}
