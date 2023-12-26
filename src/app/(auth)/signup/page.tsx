import type { DefaultInputValue, FormFields } from "../components/auth-form-layout";
import SignupClient from "./signup-client";

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
      <SignupClient defaultInputValue={defaultInputValue} formFields={formFields} />
    </main>
  );
}