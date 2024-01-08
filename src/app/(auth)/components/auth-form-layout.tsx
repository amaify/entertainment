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
    <section className="w-full rounded-[2rem] bg-secondary-background px-[2.4rem] pb-[3.2rem] pt-[3.2rem] sm:mx-auto sm:w-[40rem] sm:p-[3.2rem]">
      <h1 className="mb-16 text-left text-heading-lg capitalize text-white">{title}</h1>
      {children}
    </section>
  );
}
