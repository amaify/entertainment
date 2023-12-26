"use client";

import { FormEvent, useTransition } from "react";
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

export default function LoginClient({ formFields, defaultInputValue }: Props) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const formData = new FormData(ev.currentTarget);

    startTransition(async () => {
      const submitAction = await loginAction(formData);
      if (submitAction.message !== "success") {
        toast.error(submitAction.message, { duration: 15000 });
        return;
      }

      router.push("/");
      toast.success("Successfully logged in", { duration: 10000 });
    });
  };

  return (
    <AuthFormLayout title="login">
      <form className="w-full h-full mb-[2.4rem]" onSubmit={onSubmit}>
        <AuthFormInput
          formFields={formFields}
          defaultInputValue={defaultInputValue}
          btnTitle={pending ? "Logging in..." : "Login to your account"}
        />
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
