"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AuthCallback() {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const handleAuth = async () => {
      const { data } = await supabase.auth.getClaims();
      console.log("GET CLAIMS DATA ",  data);
      
      if (data) {
        router.replace("/onboarding");
      } else {
        router.replace("/login");
      }
    };

    handleAuth();
  }, []);

  return <p>Loading...</p>;
}