"use client";

import { createClient } from "@/lib/supabase/client";
import { useAuthStore } from "@/store/auth.store";
import { ReactNode, useEffect } from "react";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const setUser = useAuthStore((s) => s.setUser);
  const supabase = createClient();
  useEffect(() => {
    supabase.auth.getUser().then(({data}) => {
      setUser(data?.user ?? null);
    });
    
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      },
    );

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  return children;
};
