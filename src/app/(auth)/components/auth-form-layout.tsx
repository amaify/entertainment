import type { InputHTMLAttributes, ReactNode } from "react";
import type { FormInputVariant } from "@/components/ui/input";

export type FormInputName = "email" | "password" | "repeatPassword";
export type AuthVariant = "signup" | "login";
export type DefaultInputValue = Partial<Record<FormInputName, string>>;
export interface FormFields extends InputHTMLAttributes<HTMLInputElement> {
  variant: FormInputVariant;
}

interface Props {
  title: string;
  children: [ReactNode, ReactNode];
}

export default function AuthFormLayout({ title, children }: Props) {
  return (
    <section className="p-[3.2rem] w-[40rem] bg-secondary-background rounded-[2rem]">
      <h1 className="text-white text-heading-lg mb-16 text-left capitalize">{title}</h1>
      {children}
    </section>
  );
}
