"use server";

import { createClient } from "@/lib/supabase/server";

interface ActionResponse {
  message: "success" | (string & {});
}

export async function loginAction(formData: FormData): Promise<ActionResponse> {
  const { email, password } = Object.fromEntries(formData.entries()) as { [key: string]: string };
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { message: error.message };
  }

  return { message: "success" };
}
