import Link from "next/link";
import { FolderXIcon, ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center p-8 text-center bg-background">
      <div className="flex size-12 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/50 mb-4 shadow-sm">
        <FolderXIcon className="size-6 text-zinc-400" />
      </div>

      <h1 className="text-xl font-semibold tracking-tight text-foreground">
        Workspace Not Found
      </h1>
      
      <p className="text-sm text-muted-foreground max-w-sm mt-1 mb-6">
        The workspace you are looking for may not exist, has changed addresses, or you don't have permission to access it.
      </p>

      <Button 
        asChild 
        variant="outline" 
        className="gap-2 border-zinc-800 bg-zinc-900/20 hover:bg-zinc-800 hover:text-foreground text-muted-foreground transition-colors"
      >
        <Link href="/dashboard">
          <ArrowLeftIcon className="size-4" />
          Return to Dashboard
        </Link>
      </Button>
    </div>
  );
}