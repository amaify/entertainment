"use client";

import { loginAction } from "@/app/(auth)/actions/login-action";
import AuthFormFooter from "../components/auth-form-footer";
import AuthFormInput from "../components/auth-form-input.client";
import AuthFormLayout, { DefaultInputValue, FormFields } from "../components/auth-form-layout";
import useFormSubmitAction from "../use-form-submit-action";

interface Props {
  formFields: FormFields[];
  defaultInputValue: DefaultInputValue;
}

export default function LoginClient({ formFields, defaultInputValue }: Props) {
  const { onSubmit, pending } = useFormSubmitAction({
    formAction: loginAction,
    pushTo: "/",
    successMessage: "Successfully logged in"
  });

  return (
    <AuthFormLayout title="login">
      <form className="w-full h-full mb-[2.4rem]" onSubmit={onSubmit}>
        <AuthFormInput
          formFields={formFields}
          defaultInputValue={defaultInputValue}
          btnTitle={pending ? "Logging in..." : "Login to your account"}
        />
      </form>
      <AuthFormFooter authVariant="login" />
    </AuthFormLayout>
  );
}
