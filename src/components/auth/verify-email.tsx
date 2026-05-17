"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import { MailCheck } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { toast } from "sonner";

import { getClientSupabase } from "@/lib/supabase/client";

export default function VerifyEmail() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const email = searchParams.get("email") || "";

  const [seconds, setSeconds] = useState(30);

  const [loading, setLoading] = useState(false);

  const supabase = getClientSupabase();

  useEffect(() => {
    if (seconds <= 0) return;

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  async function resendEmail() {
    try {
      setLoading(true);

      const { error } = await supabase.auth.resend({
        type: "signup",
        email,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      });

      if (error) throw error;

      toast.success("Verification email sent", {position: "top-center"});

      setSeconds(30);
    } catch (error) {
      console.error(error);

      toast.error("Unable to resend email");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MailCheck className="text-green-600" />
          Verify your email
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">Please verify:</p>

        <div className="font-medium">{email}</div>

        <p className="text-sm text-muted-foreground">
          Check your inbox and click the verification link.
        </p>
      </CardContent>

      <CardFooter className="flex flex-col gap-2">
        <Button
          className="w-full"
          disabled={seconds > 0 || loading}
          onClick={resendEmail}
        >
          {seconds > 0 ? `Resend in ${seconds}s` : "Resend verification"}
        </Button>

        <Button
          variant="outline"
          className="w-full"
          onClick={() => router.replace("/login")}
        >
          Back to login
        </Button>
      </CardFooter>
    </Card>
  );
}
