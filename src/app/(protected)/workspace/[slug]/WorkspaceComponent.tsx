"use client";

import Tiptap from "@/components/Editor/Tiptap";
import { workspaceDocumentService, workspaceService } from "@/lib/services";
import { useWorkspaceStore } from "@/store/workspace.store";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Content } from "@tiptap/react";
import { useDocumentStore } from "@/store/document.store";


const WorkspaceComponent = () => {
  const params = useParams<{ slug: string }>();
  const { setIsLoadingActiveWorkspace, setActiveWorkspace } =
    useWorkspaceStore();
  const { setDocuments, setIsLoadingDocuments } = useDocumentStore();

  const [content, setContent] = useState<Content | null>(null);

  useEffect(() => {
    if (!params.slug) return;

    const initializeWorkspaceData = async () => {
      try {
        const workspace = await workspaceService.getWorkspaceBySlug(
          params.slug,
        );
        const docs = await workspaceDocumentService.getDocumentsByWorkspaceId(workspace.id);
        setDocuments(docs);
        setActiveWorkspace(workspace);
      } catch (error) {
        console.error(error);
        toast.error("Error fetching current workspace data", {
          position: "top-center",
        });
      } finally {
        setIsLoadingActiveWorkspace(false);
        setIsLoadingDocuments(false);
      }
    };
    initializeWorkspaceData();
  }, [params.slug]);

  return (
    <>
      <div>Workspace</div>
      <Tiptap content={content} onChange={setContent} />
    </>
  );
};

export default WorkspaceComponent;
