import type { ReactNode } from "react";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { createClient } from "../lib/supabase/server";
import AppProvider from "./app-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Entertainment App",
  description: "Generated by create next app",
  icons: {
    icon: "/shared/app-icon.png",
    shortcut: "/shared/app-icon.png",
    apple: "/shared/app-icon.png"
  }
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const supabase = createClient(cookies());
  const { data } = await supabase.auth.getSession();
  return (
    <html lang="en">
      <body>
        <AppProvider session={data.session}>{children}</AppProvider>
      </body>
    </html>
  );
}
