// components/workspaces/create-workspace-modal.tsx
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { WorkspaceForm } from "./workspace-form";
import { useAuthStore } from "@/store/auth.store";
import { workspaceService } from "@/lib/services";
import { toast } from "sonner";

interface CreateWorkspaceModalProps {
  trigger: React.ReactNode;
  onSuccess?: (data: any) => void;
}

export function CreateWorkspaceModal({
  trigger,
  onSuccess,
}: CreateWorkspaceModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = useAuthStore((s) => s.user);

  const handleCreate = async (workspaceName: string) => {
    setLoading(true);
    if (!user) {
      toast.error("User is not authenticated", { position: "top-center" });
      return;
    }

    try {
      const workspace = await workspaceService.createWorkspace({
        name: workspaceName,
        slug: `${Date.now()}-${Math.random()}`,
        created_by: user.id,
      });
      console.log("Response ", workspace);
      toast.success("Workspace created successfully", {
        position: "top-center",
      });
    } catch (error) {
      console.error(error);
      toast.error("Unable to create workspace", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Workspace</DialogTitle>
          <DialogDescription>
            Workspaces are where your team collaborates. You can change this
            name later.
          </DialogDescription>
        </DialogHeader>
        <WorkspaceForm onSubmit={handleCreate} isLoading={loading} />
      </DialogContent>
    </Dialog>
  );
}
