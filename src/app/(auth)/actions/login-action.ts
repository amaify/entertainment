"use server";

import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";

export async function loginAction(formData: FormData) {
  const { email, password } = Object.fromEntries(formData.entries()) as { [key: string]: string };
  const cookieStore = cookies();

  const supabase = await createClient(cookieStore);

  try {
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) throw new Error(error.message);

    return { message: "success" };
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
}
