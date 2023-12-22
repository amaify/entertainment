import AuthForm, { type FormFields } from "../auth-form";

const formFields: FormFields[] = [
  {
    id: "email",
    type: "email",
    placeholder: "Email address",
    variant: "formInput",
  },
  {
    id: "password",
    type: "password",
    placeholder: "Password",
    variant: "formInput",
  },
];

export default function Login() {
  return (
    <main>
      <AuthForm variant="login" title="login" formFields={formFields} />
    </main>
  );
}
