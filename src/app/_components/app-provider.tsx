"use client";

import { createContext, type ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Notification from "../../components/ui/notification";
import type { BkmarkedMovies } from "../[category]/bookmark-page";
import AppLayout from "../_layout/app-layout";

export type AuthSession = Session | null;

interface Props {
  children: ReactNode;
  session: AuthSession;
  bkmarkedMovies: BkmarkedMovies[] | null;
}

const queryClient = new QueryClient();

export const AppContext = createContext<Omit<Props, "children"> | null>(null);

export default function AppProvider({ children, session, bkmarkedMovies }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContext.Provider value={{ session, bkmarkedMovies }}>
        <AppLayout>
          <Notification />
          {children}
        </AppLayout>
      </AppContext.Provider>
    </QueryClientProvider>
  );
}
