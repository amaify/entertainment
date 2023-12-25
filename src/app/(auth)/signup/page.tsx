import Link from "next/link";

import { signupAction } from "@/lib/server-actions/signup-action";

import AuthFormInput from "../components/auth-form-input.client";
import AuthFormLayout, { type DefaultInputValue, type FormFields } from "../components/auth-form-layout";

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
  },
  {
    id: "repeatPassword",
    type: "password",
    name: "repeatPassword",
    placeholder: "Repeat password",
    variant: "formInput"
  }
];

const defaultInputValue: DefaultInputValue = {
  email: "",
  password: "",
  repeatPassword: ""
};

export default async function Signup() {
  return (
    <main>
      <AuthFormLayout title="sign up">
        <form className="w-full h-full mb-[2.4rem]" action={signupAction}>
          <AuthFormInput formFields={formFields} defaultInputValue={defaultInputValue} btnTitle="Create an account" />
        </form>
        <span className="text-white text-body-md flex items-center gap-[0.9rem] justify-center">
          <span>Already have an account?</span>
          <span className="text-primary">
            <Link href="/login">Login</Link>
          </span>
        </span>
      </AuthFormLayout>
    </main>
  );
}
