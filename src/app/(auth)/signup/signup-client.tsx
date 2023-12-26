"use client";

import { FormEvent, useTransition } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signupAction } from "@/lib/server-actions/signup-action";
import AuthFormInput from "../components/auth-form-input.client";
import AuthFormLayout, { DefaultInputValue, FormFields } from "../components/auth-form-layout";

interface Props {
  formFields: FormFields[];
  defaultInputValue: DefaultInputValue;
}

export default function SignupClient({ formFields, defaultInputValue }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const formData = new FormData(ev.currentTarget);

    startTransition(async () => {
      const submitAction = await signupAction(formData);

      if (submitAction.message !== "success") {
        toast.error(submitAction.message, { duration: 15000 });
        return;
      }

      toast.success("Successfully signed up", { duration: 10000 });
      router.replace("/login");
    });
  };
  return (
    <AuthFormLayout title="sign up">
      <form className="w-full h-full mb-[2.4rem]" onSubmit={onSubmit}>
        <AuthFormInput
          formFields={formFields}
          defaultInputValue={defaultInputValue}
          btnTitle={pending ? "Creating account..." : "Create an account"}
        />
      </form>
      <span className="text-white text-body-md flex items-center gap-[0.9rem] justify-center">
        <span>Already have an account?</span>
        <span className="text-primary">
          <Link href="/login">Login</Link>
        </span>
      </span>
    </AuthFormLayout>
  );
}
