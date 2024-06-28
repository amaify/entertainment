"use client";

import { createContext, useContext, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { BkmarkedMovies } from "@/app/[category]/bookmark-page";
import Modal from "@/components/modal/modal";
import Notification from "@/components/ui/notification";
import ShowProvider from "./show-provider";

interface Props {
  children: ReactNode;
  userId: string | undefined;
  avatarUrl: string;
  bkmarkedMovies: BkmarkedMovies[] | null;
}

const queryClient = new QueryClient();

export const AppContext = createContext<Omit<Props, "children"> | null>(null);

export default function AppProvider({ children, userId, avatarUrl, bkmarkedMovies }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContext.Provider value={{ userId, bkmarkedMovies, avatarUrl }}>
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
