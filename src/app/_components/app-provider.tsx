"use client";

import { createContext, type ReactNode } from "react";
import { Session } from "@supabase/supabase-js";
import Notification from "../../components/ui/notification";
import AppLayout from "../_layout/app-layout";
import { BkmarkedMovies } from "../[category]/bookmark-page";

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
