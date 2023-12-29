"use client";

import { signupAction } from "../actions/signup-action";
import AuthFormFooter from "../components/auth-form-footer";
import AuthFormInput from "../components/auth-form-input.client";
import AuthFormLayout, { DefaultInputValue, FormFields } from "../components/auth-form-layout";
import useFormSubmitAction from "../use-form-submit-action";

interface Props {
  formFields: FormFields[];
  defaultInputValue: DefaultInputValue;
}

export default function SignupClient({ formFields, defaultInputValue }: Props) {
  const { onSubmit, pending } = useFormSubmitAction({
    formAction: signupAction,
    pushTo: "/",
    successMessage: "Successfully signed up"
  });

  return (
    <AuthFormLayout title="sign up">
      <form className="w-full h-full mb-[2.4rem]" onSubmit={onSubmit}>
        <AuthFormInput
          formFields={formFields}
          defaultInputValue={defaultInputValue}
          btnTitle={pending ? "Creating account..." : "Create an account"}
        />
      </form>
      <AuthFormFooter authVariant="signup" />
    </AuthFormLayout>
  );
}
