"use server";

import type { Session } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { createClient } from "../supabase/server";

type LogoutResponse = { message: "success" | (string & {}) };
type AuthSession = Session | null;

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
