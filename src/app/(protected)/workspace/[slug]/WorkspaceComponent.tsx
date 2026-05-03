"use client";

import Tiptap from "@/components/Editor/Tiptap";
import { workspaceDocumentService, workspaceService } from "@/lib/services";
import { useWorkspaceStore } from "@/store/workspace.store";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Content } from "@tiptap/react";
import { useDocumentStore } from "@/store/document.store";
import { getClientSupabase } from "@/lib/supabase/client";


const WorkspaceComponent = () => {
  // const params = useParams<{ slug: string }>();
  // const { setIsLoadingActiveWorkspace, setActiveWorkspace } =
  //   useWorkspaceStore();
  // const { setDocuments, setIsLoadingDocuments } = useDocumentStore();
  // const supabase = getClientSupabase();


  // useEffect(() => {
  //   if (!params.slug) return;

    // const initializeWorkspaceData = async () => {
    //   try {
    //     const workspace = await workspaceService.getWorkspaceBySlug(
    //       supabase,
    //       params.slug,
    //     );
    //     const docs = await workspaceDocumentService.getDocumentsByWorkspaceId(supabase, workspace.id);
    //     setDocuments(docs);
    //     setActiveWorkspace(workspace);
    //   } catch (error) {
    //     console.error(error);
    //     toast.error("Error fetching current workspace data", {
    //       position: "top-center",
    //     });
    //   } finally {
    //     setIsLoadingActiveWorkspace(false);
    //     setIsLoadingDocuments(false);
    //   }
    // };
    // initializeWorkspaceData();
  // }, [params.slug]);

  return (
    <>
      <div>Workspace</div>
    </>
  );
};

export default WorkspaceComponent;
