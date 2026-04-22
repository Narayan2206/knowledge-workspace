"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { workspaceService } from "@/lib/services";
import { Workspaces } from "@/lib/supabase/models";
import { useAuthStore } from "@/store/auth.store";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { FolderPlus, Plus } from "lucide-react";
import { CreateWorkspaceModal } from "@/components/workspaces/create-workspace-modal";
import { toast } from "sonner";
import { useWorkspaceStore } from "@/store/workspace.store";
import { useRouter } from "next/navigation";
import { getClientSupabase } from "@/lib/supabase/client";

const DashboardComponent = () => {
  const user = useAuthStore((s) => s.user);
  const workspaces = useWorkspaceStore((s) => s.workspaces)
  const setWorkspaces = useWorkspaceStore((s) => s.setWorkspaces)
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const supabase = getClientSupabase();

  useEffect(() => {
    let isMounted = true;
    const fetchWorkspaces = async () => {
      if (!user?.id) {
        toast.error("User is not authenticated", { position: "top-center" });
        return;
      }

      try {
        setIsLoading(true);
        const data = await workspaceService.getAllWorkspaces(supabase, user.id);
        console.log("RESPONSE ", data);

        if (isMounted) {
          setWorkspaces(data || []);
        }
      } catch (error) {
        console.error("Failed to fetch workspaces:", error);
        toast.error("Failed to fetch workspaces", { position: "top-center" });
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchWorkspaces();

    return () => {
      isMounted = false;
    };
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Spinner className="size-8" />
      </div>
    );
  }

  if (workspaces.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-10 border-2 border-dashed rounded-xl bg-muted/50 gap-2">
        <div className="bg-stone-800 p-2 rounded-md">
          <FolderPlus size={16} />
        </div>
        <h2 className="text-xl font-semibold">No workspaces yet</h2>
        <p className="text-muted-foreground">
          Get started by creating your first workspace.
        </p>
        <CreateWorkspaceModal
          trigger={
            <Button>
              Create Workspace
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Welcome back, {user?.user_metadata?.name}
        </h1>
        <p className="text-muted-foreground">Select a workspace to continue.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {workspaces.map((workspace) => (
          <div
            key={workspace.id}
            className="p-5 border rounded-lg hover:border-primary transition-colors cursor-pointer bg-card shadow-sm"
            onClick={() => router.push(`/workspace/${workspace.slug}`)}
          >
            <h3 className="font-bold text-lg">{workspace.name}</h3>
            <p className="text-xs text-muted-foreground mt-2">
              Created:{" "}
              {format(new Date(workspace.created_at), "dd-MMM-yyyy hh:mm a")}
            </p>
          </div>
        ))}

        <CreateWorkspaceModal
          trigger={
            <button className="flex items-center justify-center gap-2 p-5 border-2 border-dashed rounded-lg hover:bg-accent transition-colors">
              <Plus size={16} />
              <span className="text-sm font-medium">New Workspace</span>
            </button>
          }
        />
      </div>
    </div>
  );
};

export default DashboardComponent;
