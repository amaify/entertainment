import { cookies } from "next/headers";
import Link from "next/link";

import { loginAction } from "@/lib/server-actions/login-action";
import { createClient } from "@/lib/supabase/server";

import AuthFormInput from "../components/auth-form-input.client";
import AuthFormLayout, { type DefaultInputValue, type FormFields } from "../components/auth-form-layout";

import LoginClient from "./login.client";

const formFields: FormFields[] = [
  {
    id: "email",
    type: "email",
    name: "email",
    placeholder: "Email address",
    variant: "formInput"
  },
  {
    id: "password",
    type: "password",
    name: "password",
    placeholder: "Password",
    variant: "formInput"
  }
];

const defaultInputValue: DefaultInputValue = {
  email: "",
  password: ""
};

export default function Login() {
  return (
    <main>
      {/* <AuthFormLayout title="login">
        <form className="w-full h-full mb-[2.4rem]" action={loginAction}>
          <AuthFormInput
            formFields={formFields}
            defaultInputValue={defaultInputValue}
            btnTitle="Login to your account"
          />
        </form>
        <span className="text-white text-body-md flex items-center gap-[0.9rem] justify-center">
          <span>Don&apos;t have an account?</span>
          <span className="text-primary">
            <Link href="/signup">Sign Up</Link>
          </span>
        </span>
      </AuthFormLayout> */}
      <LoginClient defaultInputValue={defaultInputValue} formFields={formFields} />
    </main>
  );
}
