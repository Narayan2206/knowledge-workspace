// app/(dashboard)/workspace/[slug]/document/[documentId]/loading.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="w-full h-full flex flex-col gap-4">
      <Skeleton className="h-10.5 w-full rounded-lg border border-zinc-700 bg-zinc-800/80 animate-pulse" />
      <Skeleton className="min-h-[50vh] w-full rounded-lg border border-zinc-700 bg-zinc-800/80 animate-pulse" />
    </div>
  );
}