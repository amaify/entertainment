"use client";

import { FormEvent, useTransition } from "react";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { loginAction } from "@/lib/server-actions/login-action";

import AuthFormInput from "../components/auth-form-input.client";
import AuthFormLayout, { DefaultInputValue, FormFields } from "../components/auth-form-layout";

interface Props {
  formFields: FormFields[];
  defaultInputValue: DefaultInputValue;
}

const initialState = {
  message: ""
};

export default function LoginClient({ formFields, defaultInputValue }: Props) {
  //   const router = useRouter();
  const [state, formAction] = useFormState(loginAction, initialState);
  // const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
  //   ev.preventDefault();
  //   const formData = new FormData(ev.currentTarget);

  //   // startTransition(async () => {
  //   //   console.log(await loginAction(formData));
  //   //   //   const loginStatus = await loginAction(formData);
  //   //   //   console.log(loginStatus)
  //   // });

  //   const submitAction = await loginAction(formData);
  //   console.log(submitAction);

  //   // if (submitAction !== "success") {
  //   //   toast.error(submitAction);
  //   //   return;
  //   // }

  //   // toast.success("Successfully logged in", { duration: 60 * 60 * 1000 });
  //   // router.replace("/");

  //   // const playAction = await play();
  //   // console.log(playAction);
  // };

  console.log(state);

  return (
    <AuthFormLayout title="login">
      <form className="w-full h-full mb-[2.4rem]" action={formAction}>
        <AuthFormInput formFields={formFields} defaultInputValue={defaultInputValue} btnTitle="Login to your account" />
      </form>
      <span className="text-white text-body-md flex items-center gap-[0.9rem] justify-center">
        <span>Don&apos;t have an account?</span>
        <span className="text-primary">
          <Link href="/signup">Sign Up</Link>
        </span>
      </span>
    </AuthFormLayout>
  );
}
