"use client";

import { getClientSupabase } from "@/lib/supabase/client";
import { useAuthStore } from "@/store/auth.store";
import { ReactNode, useEffect } from "react";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const setUser = useAuthStore((s) => s.setUser);
  const setLoading = useAuthStore((s) => s.setLoading);
  const supabase = getClientSupabase();
  useEffect(() => {
    supabase.auth.getUser().then(({data}) => {
      setUser(data?.user ?? null);
    });

    async function initAuth(){
      try {
        setLoading(true);
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUser(user ?? null);
      } catch (error) {
        console.error("Auth init error:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    initAuth()
    
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      },
    );

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, [supabase]);

  return children;
};
