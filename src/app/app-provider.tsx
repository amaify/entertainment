"use client";

import { createContext, type ReactNode } from "react";
import { Session } from "@supabase/supabase-js";
import AppLayout from "../components/layout/app-layout";
import Notification from "../components/ui/notification";
import { BkmarkedMovies } from "./[category]/bookmark-page";

export type AuthSession = Session | null;

interface Props {
  children: ReactNode;
  session: AuthSession;
  bkmarkedMovies: BkmarkedMovies[] | null;
}

export const AppContext = createContext<Omit<Props, "children"> | null>(null);

export default function AppProvider({ children, session, bkmarkedMovies }: Props) {
  return (
    <AppContext.Provider value={{ session, bkmarkedMovies }}>
      <AppLayout>
        <Notification />
        {children}
      </AppLayout>
    </AppContext.Provider>
  );
}
