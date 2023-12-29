"use client";

import type { ReactNode } from "react";
import { Session } from "@supabase/supabase-js";
import AppLayout from "../components/layout/app-layout";
import Notification from "../components/ui/notification";
import AuthProvider from "./auth-provider";

export type AuthSession = Session | null;

interface Props {
  children: ReactNode;
  session: AuthSession;
}

export default function AppProvider({ children, session }: Props) {
  return (
    <AuthProvider session={session}>
      <AppLayout>
        <Notification />
        {children}
      </AppLayout>
    </AuthProvider>
  );
}
