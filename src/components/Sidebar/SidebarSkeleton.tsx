// components/Sidebar/SidebarSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function SidebarSkeleton() {
  return (
    <aside className="w-64 border-r h-full flex flex-col p-4 bg-background">
      {/* 1. Workspace Header Section */}
      <div className="flex items-center justify-between pb-6 border-b border-zinc-800/50">
        <Skeleton className="h-5 w-32 rounded bg-zinc-800/80 border border-zinc-700/50 animate-pulse" />
        <Skeleton className="size-3 rounded bg-zinc-800/80 animate-pulse" />
      </div>

      {/* 2. Top Navigation Links Section*/}
      <div className="space-y-3 pt-6 pb-6">
        <div className="flex items-center gap-3">
          <Skeleton className="size-4 rounded bg-zinc-800/80 animate-pulse" />
          <Skeleton className="h-4 w-12 rounded bg-zinc-800/80 animate-pulse" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="size-4 rounded bg-zinc-800/80 animate-pulse" />
          <Skeleton className="h-4 w-20 rounded bg-zinc-800/80 animate-pulse" />
        </div>
      </div>

      {/* 3. Documents Heading Row */}
      <div className="flex items-center justify-between pb-3 mt-2">
        <Skeleton className="h-3 w-16 rounded bg-zinc-800/80 animate-pulse" />
        <Skeleton className="size-3 rounded bg-zinc-800/80 animate-pulse" />
      </div>

      {/* 4. Documents List Items */}
      <div className="flex-1 space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 h-8 px-2 rounded-md">
            <Skeleton 
              className="h-4 rounded bg-zinc-800/80 border border-zinc-700/50 animate-pulse" 
              style={{ width: `${Math.floor(Math.random() * (40) + 50)}%` }}
            />
          </div>
        ))}
      </div>

      {/* 5. User Profile Footer Circle (Bottom Left) */}
      <div className="pt-4 border-t border-zinc-800/50 flex items-center">
        <Skeleton className="size-8 rounded-full bg-zinc-800/80 border border-zinc-700/50 animate-pulse" />
      </div>
    </aside>
  );
}