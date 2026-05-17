// app/workspace/error.tsx
"use client";

import { AlertTriangleIcon, RefreshCwIcon, ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function WorkspaceError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center p-8 text-center bg-background">
      <div className="flex size-12 items-center justify-center rounded-lg border border-red-950 bg-red-950/10 mb-4 shadow-sm">
        <AlertTriangleIcon className="size-6 text-red-500/80" />
      </div>

      <h1 className="text-xl font-semibold tracking-tight text-foreground">
        Something went wrong
      </h1>
      
      <p className="text-sm text-muted-foreground max-w-sm mt-1 mb-6">
        {error.message || "An unexpected error occurred while loading your workspace data."}
      </p>

      <div className="flex items-center gap-3">
        <Button 
          onClick={() => reset()}
          variant="outline" 
          className="gap-2 border-zinc-800 bg-zinc-900/40 hover:bg-zinc-800 hover:text-foreground text-foreground transition-colors"
        >
          <RefreshCwIcon className="size-4" />
          Try Again
        </Button>

        <Button 
          asChild 
          variant="ghost" 
          className="gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Link href="/dashboard">
            <ArrowLeftIcon className="size-4" />
            Go to Dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
}