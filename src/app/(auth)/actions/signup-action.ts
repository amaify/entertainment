"use server";

import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";

export async function signupAction(formData: FormData) {
  const { email, password, repeatPassword } = Object.fromEntries(formData.entries()) as { [key: string]: string };

  const cookieStore = cookies();
  const supabase = await createClient(cookieStore);

  if (password !== repeatPassword) {
    return { message: "Passwords do not match" };
  }

  // try {

  // } catch (error) {

  // }
  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    return { message: error.message };
  }

  return { message: "success" };
}
