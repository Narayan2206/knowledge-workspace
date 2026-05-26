"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/auth.store";
import LogoutButton from "@/components/auth/logout-button";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, LayoutDashboardIcon, SparklesIcon } from "lucide-react";

export default function Home() {
  const user = useAuthStore((s) => s.user);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-zinc-800">
      <nav className="flex items-center justify-between p-4 max-w-6xl w-full mx-auto border-b border-zinc-900">
        <div className="flex items-center gap-2 font-semibold tracking-tight text-lg">
          <div className="size-6 rounded bg-primary flex items-center justify-center font-bold text-xs">
            S
          </div>
          <span>Slate</span>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                <Link href="/dashboard" className="gap-2">
                  <LayoutDashboardIcon className="size-4" />
                  Dashboard
                </Link>
              </Button>
              <LogoutButton variant="outline" />
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/signup">Sign up</Link>
              </Button>
            </>
          )}
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-3xl mx-auto my-auto">
      
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/30 text-xs text-muted-foreground mb-6 animate-fade-in">
          <SparklesIcon className="size-3 text-zinc-400" />
          <span>A minimal space for structured thinking</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-linear-to-b from-foreground to-primary max-w-2xl leading-tight">
          Workspaces built for focused thinking.
        </h1>

        <p className="text-sm sm:text-base text-muted-foreground max-w-lg mt-4 mb-8 leading-relaxed">
          Organize documents, capture ideas, and manage your workspace in one distraction-free place.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          {user ? (
            <div className="space-y-4">
              <Button asChild size="lg" className="gap-2 shadow-sm">
                <Link href="/dashboard">
                  Go to Dashboard
                  <ArrowRightIcon className="size-4" />
                </Link>
              </Button>
              <p className="text-xs text-muted-foreground block">
                Logged in as <span className="text-zinc-400 font-medium">{user?.user_metadata?.email || user?.email}</span>
              </p>
            </div>
          ) : (
            <Button asChild size="lg" className="gap-2 shadow-sm">
              <Link href="/signup">
                Get Started
                <ArrowRightIcon className="size-4" />
              </Link>
            </Button>
          )}
        </div>
      </main>

      <footer className="p-6 text-center text-xs text-muted-foreground border-t border-zinc-900 max-w-6xl w-full mx-auto">
        Built with Next.js and Supabase.
      </footer>
    </div>
  );
}