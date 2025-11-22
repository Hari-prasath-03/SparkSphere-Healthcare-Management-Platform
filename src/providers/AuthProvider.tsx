import { getUserRole } from "@/api";
import client from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";
import { createContext, use, useEffect, useState } from "react";

interface AuthContext {
  user: User | null;
  loading: boolean;
  role: Role | null;
}

type Role = "user" | "hospital";

const AuthContext = createContext<AuthContext | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.auth.getSession().then(async ({ data: { session } }) => {
      const authUser = session?.user || null;
      setUser(authUser);

      if (authUser) {
        const { data, error } = await getUserRole(authUser.id);
        if (!error && data) setRole(data.role as Role);
      }

      setLoading(false);
    });

    const { data: authListener } = client.auth.onAuthStateChange(
      (_e, session) => setUser(session?.user || null)
    );

    return () => authListener?.subscription.unsubscribe();
  }, []);

  return <AuthContext value={{ user, loading, role }}>{children}</AuthContext>;
};

const useAuth = () => {
  const context = use(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

// eslint-disable-next-line
export { AuthProvider, useAuth };
