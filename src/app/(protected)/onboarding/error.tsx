"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">
        Something went wrong
      </h1>

      <p className="text-muted-foreground text-center">
        We couldn't complete onboarding validation.
      </p>

      <div className="flex gap-2">
        <Button onClick={() => reset()}>
          Try again
        </Button>

        <Button
          variant="outline"
          onClick={() => {
            window.location.href="/dashboard";
          }}
        >
          Go to dashboard
        </Button>
      </div>
    </div>
  );
}