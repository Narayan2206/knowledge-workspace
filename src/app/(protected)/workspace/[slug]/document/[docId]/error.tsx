"use client";

import { AlertTriangleIcon, RefreshCwIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DocumentError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center bg-background">
      <div className="flex size-12 items-center justify-center rounded-lg border border-red-900/50 bg-red-950/20 mb-4 shadow-sm">
        <AlertTriangleIcon className="size-6 text-red-400" />
      </div>
      <h3 className="font-semibold text-lg text-foreground">Something went wrong</h3>
      <p className="text-sm text-muted-foreground max-w-sm mt-1 mb-6">
        {error.message || "An error occurred while loading this document."}
      </p>
      <Button 
        onClick={() => reset()}
        variant="outline" 
        className="gap-2 border-zinc-700 hover:bg-zinc-800"
      >
        <RefreshCwIcon className="size-4" />
        Try Again
      </Button>
    </div>
  );
}