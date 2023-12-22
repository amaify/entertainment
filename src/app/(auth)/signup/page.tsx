import AuthForm, { type FormFields } from "../components/auth-form";

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
  {
    id: "repeatPassword",
    type: "password",
    placeholder: "Repeat password",
    variant: "formInput",
  },
];

export default function SignUpPage() {
  return (
    <main>
      <AuthForm variant="signup" title="Sign Up" formFields={formFields} />;
    </main>
  );
}
