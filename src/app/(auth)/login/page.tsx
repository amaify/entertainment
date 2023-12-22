"use client";

import Button from "@/components/ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import AuthForm, { FormFields } from "../components/auth-form";

const formFields: FormFields[] = [
  {
    id: "email",
    type: "email",
    placeholder: "Email address",
    variant: "formInput",
  },
  {
    id: "password",
    type: "password",
    placeholder: "Password",
    variant: "formInput",
  },
];

export default function Login() {
  const router = useRouter();
  const supabase = createClientComponentClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  });

  const handleSignup = async () => {
    console.log("CLICKED");
    await supabase.auth.signUp({
      email: "john.ugwuanyi@yahoo.com",
      password: "test1234",
      options: {
        emailRedirectTo: `http://${location.origin}/auth/callback`,
      },
    });
    router.refresh();
  };

  const handleLogin = async () => {
    console.log("login!!");
    await supabase.auth.signInWithPassword({
      email: "john.ugwuanyi@yahoo.com",
      password: "test1234",
    });
    router.refresh();
  };
  return (
    <main>
      <AuthForm variant="login" title="login" formFields={formFields} />
    </main>
  );
}
