"use client";

import { createContext, type ReactNode } from "react";
import { Session } from "@supabase/supabase-js";
import AppLayout from "../components/layout/app-layout";
import Notification from "../components/ui/notification";

export type AuthSession = Session | null;

interface Props {
  children: ReactNode;
  session: AuthSession;
}

export const AuthContext = createContext<AuthSession | null>(null);

export default function AppProvider({ children, session }: Props) {
  return (
    <AuthContext.Provider value={session}>
      <AppLayout>
        <Notification />
        {children}
      </AppLayout>
    </AuthContext.Provider>
  );
}
