// src/app/not-found.tsx
import Link from "next/link";
import { HelpCircleIcon, ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalNotFound() {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center p-8 text-center bg-background overflow-hidden">
      
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f23_1px,transparent_1px),linear-gradient(to_bottom,#1f1f23_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40" />

      <div className="relative z-10 flex flex-col items-center">
        <div className="flex size-14 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/50 mb-6 shadow-md backdrop-blur-sm">
          <HelpCircleIcon className="size-7 text-zinc-400 animate-pulse" />
        </div>

        <span className="text-xs font-mono font-semibold tracking-widest text-zinc-500 uppercase px-2.5 py-1 bg-zinc-900/80 border border-zinc-800 rounded-full mb-3">
          Error 404
        </span>

        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Page not found
        </h1>
        
        <p className="text-sm text-muted-foreground max-w-sm mt-2 mb-8 leading-relaxed">
          We couldn't find the page you're looking for. Check the URL address bar or return back to safety below.
        </p>

        <Button 
          asChild 
          size="lg"
          className="gap-2 bg-foreground text-background hover:bg-zinc-200 shadow-sm font-medium transition-all"
        >
          <Link href="/">
            <ArrowLeftIcon className="size-4" />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}