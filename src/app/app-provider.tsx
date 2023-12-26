"use client";

import type { ReactNode } from "react";

import Notification from "@/components/ui/notification";

import "./globals.css";

export default function AppProvider({ children }: { children: ReactNode }) {
  return (
    <>
      <Notification />
      {children}
    </>
  );
}
