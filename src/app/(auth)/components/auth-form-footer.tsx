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
    <span className="flex items-center justify-center gap-[0.9rem] text-body-md text-white">
      <span>{footerText} have an account?</span>
      <span className="text-primary">
        <Link href={footerLink.href}>{footerLink.title}</Link>
      </span>
    </span>
  );
}
