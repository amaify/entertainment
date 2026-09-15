"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { createContext, type ReactNode, Suspense } from "react";
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
    const searchParams = useSearchParams();
    const showModal = searchParams.get("id") as string;

    return (
        <QueryClientProvider client={queryClient}>
            <AppContext.Provider value={{ userId, avatarUrl }}>
                {showModal ? (
                    <Suspense>
                        <Modal />
                    </Suspense>
                ) : null}
                <ShowProvider>
                    <Notification />
                    {children}
                </ShowProvider>
            </AppContext.Provider>
        </QueryClientProvider>
    );
}
