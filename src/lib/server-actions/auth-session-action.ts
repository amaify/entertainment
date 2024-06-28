"use server";

import { createClient } from "../supabase/server";

type LogoutResponse = { message: "success" | (string & {}) };

export async function authSessionAction() {
  const supabase = createClient();

  const {
    data: { session }
  } = await supabase.auth.getSession();

  return session;
}

export async function logoutAction(): Promise<LogoutResponse> {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    return { message: error.message };
  }

  return { message: "success" };
}

export async function getUserAction() {
  try {
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();

    return data.user;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
