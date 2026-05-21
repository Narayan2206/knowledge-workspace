"use client";
import CustomInput from "@/components/CustomInput/CustomInput";
import { Button } from "@/components/ui/button";
import { useWorkspace } from "@/components/workspaces/workspace-provider";
import { workspaceService } from "@/lib/services";
import { getClientSupabase } from "@/lib/supabase/client";
import {
  Loader2Icon,
  Trash2Icon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";

export default function WorkspaceSettingsClient() {
  const [isUpdating, setIsUpdating] = useState(false);
  const supabase = getClientSupabase();
  const router = useRouter();
  const { workspace: activeWorkspace } = useWorkspace();
  const originalWorkspaceName = useRef(activeWorkspace?.name ?? "");
  const [workspaceName, setWorkspaceName] = useState<string>(
    activeWorkspace?.name ?? "",
  );
  const saveButtonDisabled =
    workspaceName.trim().length < 3 ||
    workspaceName.trim() === originalWorkspaceName.current;

  const handleUpdateWorkspace = async () => {
    if (!activeWorkspace) return;
    const trimmedName = workspaceName.trim();
    if (
      trimmedName.length < 3 ||
      trimmedName === originalWorkspaceName.current
    ) {
      toast.error("Workspace name is invalid", { position: "top-center" });
      return;
    }

    try {
      setIsUpdating(true);
      const updatedWorkspace = await workspaceService.updateWorkspace(
        supabase,
        activeWorkspace.id,
        trimmedName,
      );

      originalWorkspaceName.current = updatedWorkspace.name;

      toast.success("Workspace updated successfully", {
        position: "top-center",
      });

      router.refresh();
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message || "Failed to update workspace", {
        position: "top-center",
      });
    } finally {
      setIsUpdating(false);
    }
  };
  return (
    <main className="flex-1">
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
        <section className="rounded-xl border border-zinc-900 bg-zinc-950/20 p-6">
          <h3 className="text-base font-semibold tracking-tight">
            Workspace Profile
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5 mb-4">
            Change the display identifiers for this instance.
          </p>
          <div className="rounded-lg border border-dashed border-zinc-800 flex items-center justify-center text-xs text-zinc-500 font-mono p-4 flex-col gap-4">
            <CustomInput
              label="Workspace Name"
              value={workspaceName}
              onChange={setWorkspaceName}
              placeholder="e.g. company name"
              type="text"
            />
            <Button
              onClick={handleUpdateWorkspace}
              size="sm"
              className="gap-2 self-start"
              disabled={saveButtonDisabled || isUpdating}
            >
              {isUpdating ? (
                <>
                  <Loader2Icon className="size-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </section>

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
