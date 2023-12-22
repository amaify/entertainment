import Button from "@/components/ui/button";
import Input, { type FormInputVariant } from "@/components/ui/input";
import Link from "next/link";
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
  return (
    <section className="p-[3.2rem] w-[40rem] bg-secondary-background rounded-[2rem]">
      <h1 className="text-white text-heading-lg mb-16 text-left capitalize">
        {title}
      </h1>
      <form className="w-full h-full mb-[2.4rem]">
        <div className="flex flex-col gap-[2.4rem] mb-[4rem]">
          {formFields.map((field) => (
            <Input
              key={field.id}
              variant={field.variant}
              type={field.type}
              placeholder={field.placeholder}
            />
          ))}
        </div>
        <Button>{buttonTitle}</Button>
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
