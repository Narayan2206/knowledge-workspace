import VerifyEmail from "@/components/auth/verify-email";
import { Spinner } from "@/components/ui/spinner";
import { Suspense } from "react";

export default function VerifyEmailPage() {
  return (
    <main className="h-screen flex items-center justify-center px-4">
      <Suspense fallback={<Spinner />}>
        <VerifyEmail />
      </Suspense>
    </main>
  );
}
