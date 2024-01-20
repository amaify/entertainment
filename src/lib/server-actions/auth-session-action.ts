"use server";

import { cookies } from "next/headers";
import type { AuthSession } from "@/app/app-provider";
import { createClient } from "../supabase/server";

type LogoutResponse = { message: "success" | (string & {}) };

export async function authSessionAction(): Promise<AuthSession> {
  const supabase = createClient(cookies());

  const {
    data: { session }
  } = await supabase.auth.getSession();

  return session;
}

export async function logoutAction(): Promise<LogoutResponse> {
  const supabase = createClient(cookies());
  const { error } = await supabase.auth.signOut();

  if (error) {
    return { message: error.message };
  }

  return { message: "success" };
}

export async function getUserAction() {
  const supabase = createClient(cookies());
  const { data } = await supabase.auth.getUser();

  return data.user;
}
