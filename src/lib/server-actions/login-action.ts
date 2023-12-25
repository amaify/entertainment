"use server";

import { cookies } from "next/headers";

import { createClient } from "../supabase/server";

interface ActionResponse {
  message: "success" | (string & {});
}

export async function loginAction(prevState: any, formData: FormData): Promise<ActionResponse> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    return { message: error.message };
  }

  return { message: "success" };
}
