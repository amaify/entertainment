import Button from "@/components/ui/button";
import Input, { type FormInputVariant } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/server";
import { cookies, headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { InputHTMLAttributes } from "react";

export interface FormFields extends InputHTMLAttributes<HTMLInputElement> {
  variant: FormInputVariant;
}

interface Props {
  title: string;
  variant: "signup" | "login";
  formFields: FormFields[];
}

export default function AuthForm({ title, variant, formFields }: Props) {
  const isLogin = variant === "login";
  const buttonTitle = isLogin ? "Login to your account" : "Create an account";
  const footerText = isLogin ? "Don't" : "Already";
  const footerAction = {
    title: isLogin ? "Sign Up" : "Login",
    link: isLogin ? "/signup" : "/login",
  };

  const handleFormSubmit = async (formData: FormData) => {
    "use server";
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect(`/login?message=${error.message}`);
    }

    return redirect("/");
  };

  const handleSignup = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.log(error);
      return redirect(`/login?message=${error.message}`);
    }

    return redirect("/login");
  };

  return (
    <section className="p-[3.2rem] w-[40rem] bg-secondary-background rounded-[2rem]">
      <h1 className="text-white text-heading-lg mb-16 text-left capitalize">
        {title}
      </h1>
      <form className="w-full h-full mb-[2.4rem]" action={handleFormSubmit}>
        <div className="flex flex-col gap-[2.4rem] mb-[4rem]">
          {formFields.map((field) => (
            <Input
              key={field.id}
              variant={field.variant}
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
            />
          ))}
        </div>
        {isLogin && <Button type="submit">{buttonTitle}</Button>}
        {!isLogin && <Button formAction={handleSignup}>{buttonTitle}</Button>}
      </form>
      <span className="text-white text-body-md flex items-center gap-[0.9rem] justify-center">
        <span>{footerText} have an account?</span>
        <span className="text-primary">
          <Link href={footerAction.link}>{footerAction.title}</Link>
        </span>
      </span>
    </section>
  );
}
