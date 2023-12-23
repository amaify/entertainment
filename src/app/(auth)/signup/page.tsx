import AuthForm, { type FormFields } from "../auth-form";

const formFields: FormFields[] = [
  {
    id: "email",
    type: "email",
    name: "email",
    placeholder: "Email address",
    variant: "formInput",
  },
  {
    id: "password",
    type: "password",
    name: "password",
    placeholder: "Password",
    variant: "formInput",
  },
  {
    id: "repeatPassword",
    type: "password",
    placeholder: "Repeat password",
    variant: "formInput",
  },
];

export default function Signup() {
  return (
    <main>
      <AuthForm variant="signup" title="Sign Up" formFields={formFields} />;
    </main>
  );
}
