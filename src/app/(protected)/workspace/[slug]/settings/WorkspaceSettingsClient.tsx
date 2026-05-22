"use client";
import CustomInput from "@/components/CustomInput/CustomInput";
import { Button } from "@/components/ui/button";
import { useWorkspace } from "@/components/workspaces/workspace-provider";
import { workspaceService } from "@/lib/services";
import { getClientSupabase } from "@/lib/supabase/client";
import { AlertTriangleIcon, Loader2Icon, Trash2Icon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useWorkspaceStore } from "@/store/workspace.store";
import { PERMISSIONS } from "@/lib/permissions";

export default function WorkspaceSettingsClient() {
  const [isUpdating, setIsUpdating] = useState(false);
  const supabase = getClientSupabase();
  const router = useRouter();
  const { workspace: activeWorkspace, role: memberRole } = useWorkspace();
  const workspaces = useWorkspaceStore((s) => s.workspaces);
  const setWorkspaces  = useWorkspaceStore((s) => s.setWorkspaces);
  const originalWorkspaceName = useRef(activeWorkspace?.name ?? "");
  const [workspaceName, setWorkspaceName] = useState<string>(
    activeWorkspace?.name ?? "",
  );
  const saveButtonDisabled =
    workspaceName.trim().length < 3 ||
    workspaceName.trim() === originalWorkspaceName.current;

  const [isOpen, setIsOpen] = useState(false);
  const [confirmName, setConfirmName] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const isMatch = confirmName.trim() === activeWorkspace?.name;
  const manageWorkspace = PERMISSIONS.canManageWorkspace(memberRole);

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
      setWorkspaces(workspaces.map((w) => w.id === updatedWorkspace.id ? updatedWorkspace : w));

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

  const handleDeleteWorkspace = async () => {
    if (!activeWorkspace || !isMatch) return;

    try {
      setIsDeleting(true);

      await workspaceService.deleteWorkspace(supabase, activeWorkspace.id);

      toast.success("Workspace deleted successfully", {
        position: "top-center",
      });
      
      setIsOpen(false);
      router.replace("/dashboard");
      router.refresh();
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message || "Failed to delete workspace", {
        position: "top-center",
      });
    } finally {
      setIsDeleting(false);
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

      {!manageWorkspace && (<div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 mb-8">
        <p className="text-sm text-zinc-300">
          You have <span className="font-semibold">{memberRole}</span> access in this workspace.
        </p>

        <p className="text-xs text-muted-foreground mt-1">
          Some settings and administrative actions are restricted to workspace owners.
        </p>
      </div>)}

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
              disabled={!manageWorkspace}
            />
            <Button
              onClick={handleUpdateWorkspace}
              size="sm"
              className="gap-2 self-start"
              disabled={saveButtonDisabled || isUpdating || !manageWorkspace}
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

        { manageWorkspace && (<section className="rounded-xl border border-red-950/40 bg-red-950/5 p-6">
          <div className="flex items-center gap-2 text-red-400">
            <Trash2Icon className="size-4" />
            <h3 className="text-base font-semibold tracking-tight">
              Danger Zone
            </h3>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5 mb-4">
            Permanent actions that affect this workspace and all associated documents.
          </p>
          <div className="flex items-center justify-start">
            <AlertDialog
              open={isOpen}
              onOpenChange={(open) => {
                setIsOpen(open);
                if (!open) setConfirmName("");
              }}
            >
              <AlertDialogTrigger asChild>
                <Button
                  size="sm"
                  variant="destructive"
                  className="bg-red-950/40 hover:bg-red-600 border border-red-900/50 hover:border-red-500 text-red-200 hover:text-white transition-all font-medium"
                >
                  Delete Workspace
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent className="bg-zinc-950 border-zinc-800 max-w-md">
                <AlertDialogHeader>
                  <div className="flex size-10 items-center justify-center rounded-lg border border-red-950 bg-red-950/20 mb-2">
                    <AlertTriangleIcon className="size-5 text-red-500" />
                  </div>
                  <AlertDialogTitle className="text-foreground text-lg font-semibold tracking-tight">
                    Delete Workspace Environment?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-sm text-muted-foreground mt-1">
                    This operation cannot be undone. This will permanently
                    delete the active workspace, along with all associated
                    documents.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <div className="my-4 space-y-2">
                  <label className="text-xs font-medium text-muted-foreground">
                    To confirm, type{" "}
                    <span className="text-zinc-200 font-mono font-semibold select-all px-1 py-0.5 bg-zinc-900 border border-zinc-800 rounded">
                      {activeWorkspace?.name}
                    </span>{" "}
                    below:
                  </label>
                  <CustomInput
                    value={confirmName}
                    onChange={setConfirmName}
                    placeholder="Type workspace name to confirm"
                    disabled={isDeleting}
                  />
                </div>

                <AlertDialogFooter className="gap-2">
                  <AlertDialogCancel
                    disabled={isDeleting}
                    className="border-zinc-800 bg-transparent text-muted-foreground hover:bg-zinc-900 hover:text-foreground transition-colors"
                  >
                    Cancel
                  </AlertDialogCancel>
                  <Button
                    variant="destructive"
                    disabled={!isMatch || isDeleting}
                    onClick={handleDeleteWorkspace}
                    className="bg-red-600 hover:bg-red-500 text-white gap-2 disabled:opacity-40 disabled:hover:bg-red-600 cursor-pointer disabled:cursor-not-allowed"
                  >
                    {isDeleting ? (
                      <>
                        <Loader2Icon className="size-4 animate-spin" />
                        Deleting...
                      </>
                    ) : (
                      "Confirm Delete"
                    )}
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </section>)}
      </div>
    </main>
  );
}
