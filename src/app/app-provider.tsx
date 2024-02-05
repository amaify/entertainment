"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { BkmarkedMovies } from "@/app/[category]/bookmark-page";
import Modal from "@/components/modal/modal";
import Notification from "@/components/ui/notification";
import ShowProvider from "./show-provider";

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
        <Modal />
        <ShowProvider>
          <Notification />
          {children}
        </ShowProvider>
      </AppContext.Provider>
    </QueryClientProvider>
  );
}

export function useAppProviderContext() {
  const appProvider = useContext(AppContext);

  if (!appProvider) {
    throw new Error("useAppProviderContext must be used within an AppProvider");
  }

  return appProvider;
}
