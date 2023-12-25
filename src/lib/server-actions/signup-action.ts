"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function signupAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const repeatPassword = formData.get("repeatPassword") as string;
  const supabase = createServerActionClient({ cookies });

  if (password !== repeatPassword) {
    return { message: "Passwords do not match" };
  }

  const { error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) {
    return { message: error.message };
  }

  return { message: "success" };
}
