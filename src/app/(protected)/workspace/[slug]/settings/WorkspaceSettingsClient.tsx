// app/(protected)/workspace/[slug]/settings/WorkspaceSettingsClient.tsx
"use client";
import { SettingsIcon, SlidersIcon, Trash2Icon } from "lucide-react";

export default function WorkspaceSettingsClient() {
  return (
    <main className="flex-1">
      {/* Header Summary */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">
          Workspace Settings
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Manage your workspace details, configurations, and data retention
          policies.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: General Info Card Box */}
        <section className="rounded-xl border border-zinc-900 bg-zinc-950/20 p-6">
          <h3 className="text-base font-semibold tracking-tight">
            Workspace Profile
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5 mb-4">
            Change the display identifiers for this instance.
          </p>
          <div className="h-28 rounded-lg border border-dashed border-zinc-800 flex items-center justify-center text-xs text-zinc-500 font-mono">
            [Form Fields will go here: Workspace Name Input]
          </div>
        </section>

        {/* Section 2: Danger Zone */}
        <section className="rounded-xl border border-red-950/40 bg-red-950/5 p-6">
          <div className="flex items-center gap-2 text-red-400">
            <Trash2Icon className="size-4" />
            <h3 className="text-base font-semibold tracking-tight">
              Danger Zone
            </h3>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5 mb-4">
            Irreversible actions regarding this workspace environment.
          </p>
          <div className="h-24 rounded-lg border border-dashed border-red-950/30 flex items-center justify-center text-xs text-red-400/60 font-mono">
            [Destructive Button will go here: Delete Workspace]
          </div>
        </section>
      </div>
    </main>
  );
}
