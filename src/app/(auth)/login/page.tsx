import LoginClient from "./login.client";
import type { DefaultInputValue, FormFields } from "../components/auth-form-layout";

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
    <main className="w-full">
      <LoginClient defaultInputValue={defaultInputValue} formFields={formFields} />
    </main>
  );
}
