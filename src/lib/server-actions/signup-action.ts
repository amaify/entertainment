"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { createClient } from "../supabase/server";

export async function signupAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const repeatPassword = formData.get("repeatPassword") as string;
  const supabase = createClient(cookies());

  if (password !== repeatPassword) {
    return redirect(`/signup?message=Passwords don't match`);
  }

  const { error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) {
    return redirect(`/signup?message=${error.message}`);
  }

  return redirect("/login");
}
