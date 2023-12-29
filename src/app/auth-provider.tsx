import { createContext, type ReactNode, useEffect, useState } from "react";
import { createClient } from "../lib/supabase/client";
import { AuthSession } from "./app-provider";

interface Props {
  children: ReactNode;
  session: AuthSession;
}

export const AuthContext = createContext<AuthSession | null>(null);

export default function AuthProvider({ children, session: authSession }: Props) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const supabase = createClient();

  const getAuthSession = async () => {
    const {
      data: { session }
    } = await supabase.auth.getSession();

    setSession(session);
  };

  useEffect(() => {
    getAuthSession();
  }, [authSession]);

  return <AuthContext.Provider value={session}>{children}</AuthContext.Provider>;
}
