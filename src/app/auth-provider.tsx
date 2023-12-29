import { createContext, type ReactNode } from "react";
import { AuthSession } from "./app-provider";

interface Props {
  children: ReactNode;
  session: AuthSession;
}

export const AuthContext = createContext<AuthSession | null>(null);

export default function AuthProvider({ children, session }: Props) {
  return <AuthContext.Provider value={session}>{children}</AuthContext.Provider>;
}
