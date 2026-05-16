"use client";

import { workspaceDocumentService, workspaceService } from "@/lib/services";
import { useWorkspaceStore } from "@/store/workspace.store";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Content } from "@tiptap/react";
import { useDocumentStore } from "@/store/document.store";
import { getClientSupabase } from "@/lib/supabase/client";
import { useWorkspace } from "@/components/workspaces/workspace-provider";
import { useAuthStore } from "@/store/auth.store";
import { Button } from "@/components/ui/button";
import { FileTextIcon, PlusIcon } from "lucide-react";
import Link from "next/link";

const defaultContent = {
  type: "doc",
  content: [
    {
      type: "paragraph",
    },
  ],
};

const WorkspaceComponent = () => {
  const {workspace: activeWorkspace, documents} = useWorkspace();
  const user = useAuthStore((s) => s.user);
  const router = useRouter();
  const supabase = getClientSupabase();
  
  async function handleCreateDocument() {
      if(!activeWorkspace || !user) return;
    try {
      const newDoc = await workspaceDocumentService.createDocument(supabase, {
        workspace_id: activeWorkspace.id,
        title: "Untitled",
        content: defaultContent,
        created_by: user.id, 
      });
  
      console.log("Created doc:", newDoc);
      router.push(
        `/workspace/${activeWorkspace.slug}/document/${newDoc.id}`
      );
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error("Error creating document ", { position: "top-center" });
    }
  }
  
  return (
    <div className="flex flex-col h-full w-full p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between border-b pb-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {activeWorkspace?.name || "Workspace"}
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage and edit your workspace documents.
          </p>
        </div>
        {documents && documents.length > 0 && (
          <Button onClick={handleCreateDocument} size="sm" className="gap-2">
            <PlusIcon className="size-4" />
            New Document
          </Button>
        )}
      </div>

      {!documents || documents.length === 0 ? (
        <div className="flex flex-col items-center justify-center border border-dashed rounded-xl p-16 text-center bg-muted/20 my-auto">
          <div className="flex size-12 items-center justify-center rounded-lg border bg-background shadow-sm mb-4">
            <FileTextIcon className="size-6 text-muted-foreground" />
          </div>
          <h3 className="font-semibold text-lg">No documents created yet</h3>
          <p className="text-sm text-muted-foreground max-w-sm mt-1 mb-6">
            Get started by creating your first document to capture thoughts, meeting notes, or documentation.
          </p>
          <Button onClick={handleCreateDocument} className="gap-2">
            <PlusIcon className="size-4" />
            Create First Document
          </Button>
        </div>
      ) : (
        <div className="grid gap-3">
          {documents.map((doc) => (
            <Link 
              key={doc.id} 
              href={`/workspace/${activeWorkspace?.slug}/document/${doc.id}`}
              className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-accent transition-colors cursor-pointer group"
            >
              <FileTextIcon className="size-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{doc.title || "Untitled"}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkspaceComponent;
