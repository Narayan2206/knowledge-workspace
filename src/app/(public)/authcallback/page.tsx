"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Spinner } from "@/components/ui/spinner";

export default function AuthCallback() {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    let isMounted = true;
    const handleAuth = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      console.log("USER DATA ", user);

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
  }, [router, supabase]);

  return (
    <main className="h-screen">
      <div className="flex flex-col gap-2 items-center justify-center h-full">
        <Spinner className="size-16" />
        <p>Verifying, please wait...</p>
      </div>
    </main>
  );
}
