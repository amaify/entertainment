"use client";

import { createContext, Suspense, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Modal from "@/components/modal/modal";
import Notification from "@/components/ui/notification";
import ShowProvider from "./show-provider";

interface Props {
  children: ReactNode;
  userId: string | undefined;
  avatarUrl: string;
}

const queryClient = new QueryClient();

export const AppContext = createContext<Omit<Props, "children"> | null>(null);

export default function AppProvider({ children, userId, avatarUrl }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContext.Provider value={{ userId, avatarUrl }}>
        <Suspense>
          <Modal />
        </Suspense>
        <ShowProvider>
          <Notification />
          {children}
        </ShowProvider>
      </AppContext.Provider>
    </QueryClientProvider>
  );
}
