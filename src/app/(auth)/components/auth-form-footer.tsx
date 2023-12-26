import Link from "next/link";
import type { AuthVariant } from "./auth-form-layout";

interface Props {
  authVariant: AuthVariant;
}

export default function AuthFormFooter({ authVariant }: Props) {
  const isLogin = authVariant === "login";
  const footerText = isLogin ? "Don't" : "Already";
  const footerLink = {
    ...(isLogin ? { href: "/signup", title: "Sign Up" } : { href: "/login", title: "Login" })
  };
  return (
    <span className="text-white text-body-md flex items-center gap-[0.9rem] justify-center">
      <span>{footerText} have an account?</span>
      <span className="text-primary">
        <Link href={footerLink.href}>{footerLink.title}</Link>
      </span>
    </span>
  );
}
