"use client";

import type { ReactNode } from "react";
import "./globals.css";
import Notification from "@/components/ui/notification";

export default function AppProvider({ children }: { children: ReactNode }) {
  return (
    <>
      <Notification />
      {children}
    </>
  );
}
