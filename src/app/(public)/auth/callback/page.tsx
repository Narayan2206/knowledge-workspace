"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getClientSupabase } from "@/lib/supabase/client";
import { Spinner } from "@/components/ui/spinner";

export default function AuthCallback() {
  const router = useRouter();
  const supabase = getClientSupabase();

  useEffect(() => {
    let isMounted = true;
    const handleAuth = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (isMounted) {
        if (error || !user) {
          router.replace("/login");
        } else {
          router.replace("/onboarding");
        }
      }
    };

    handleAuth();
    return () => {
      isMounted = false;
    };
  }, [router]);

  return (
    <main className="h-screen">
      <div className="flex flex-col gap-2 items-center justify-center h-full">
        <Spinner className="size-16" />
        <p>Verifying, please wait...</p>
      </div>
    </main>
  );
}
