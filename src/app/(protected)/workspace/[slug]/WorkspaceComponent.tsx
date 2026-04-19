"use client";

import { workspaceService } from "@/lib/services";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const WorkspaceComponent = () => {
  const params = useParams<{ slug: string }>();
  useEffect(() => {
    if (!params.slug) return;

    const fetchWorkspaceBySlug = async () => {
      try {
        const workspace = await workspaceService.getWorkspaceBySlug(params.slug);
        console.log("WORKSPACE ", workspace);
      } catch (error) {
        console.error(error);
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
