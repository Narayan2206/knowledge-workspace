"use client";

import { workspaceService } from "@/lib/services";
import { useWorkspaceStore } from "@/store/workspace.store";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const WorkspaceComponent = () => {
  const params = useParams<{ slug: string }>();
  const {setIsLoadingActiveWorkspace, setActiveWorkspace} = useWorkspaceStore()
  useEffect(() => {
    if (!params.slug) return;

    const fetchWorkspaceBySlug = async () => {
      try {
        const workspace = await workspaceService.getWorkspaceBySlug(params.slug);
        setActiveWorkspace(workspace);
      } catch (error) {
        console.error(error);
        toast.error("Error fetching current workspace", { position: "top-center" });
      } finally {
        setIsLoadingActiveWorkspace(false);
      }
    };
    fetchWorkspaceBySlug();
  }, [params.slug]);

  return (
    <>
      <div>Workspace</div>
    </>
  );
};

export default WorkspaceComponent;
