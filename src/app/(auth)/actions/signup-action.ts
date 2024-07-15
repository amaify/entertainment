"use server";

import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";

export async function signupAction(formData: FormData) {
  const { email, password, repeatPassword } = Object.fromEntries(formData.entries()) as { [key: string]: string };

  const cookieStore = cookies();
  const supabase = await createClient(cookieStore);

  try {
    if (password !== repeatPassword) throw new Error("Passwords do not match");

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) throw new Error(error.message);

    return { message: "success" };
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
}
