import type { InputHTMLAttributes, ReactNode } from "react";
import { FormInputVariant } from "@/components/ui/input";

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
    <section className="w-full bg-secondary-background rounded-[2rem] pb-[3.2rem] px-[2.4rem] pt-[3.2rem] sm:p-[3.2rem] sm:w-[40rem] sm:mx-auto">
      <h1 className="text-white text-heading-lg mb-16 text-left capitalize">{title}</h1>
      {children}
    </section>
  );
}
