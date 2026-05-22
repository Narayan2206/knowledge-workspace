"use client";

import { workspaceDocumentService } from "@/lib/services";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getClientSupabase } from "@/lib/supabase/client";
import { useWorkspace } from "@/components/workspaces/workspace-provider";
import { useAuthStore } from "@/store/auth.store";
import { Button } from "@/components/ui/button";
import { FileTextIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { PERMISSIONS } from "@/lib/permissions";

const defaultContent = {
  type: "doc",
  content: [
    {
      type: "paragraph",
    },
  ],
};

const WorkspaceComponent = () => {
  const { workspace: activeWorkspace, documents, role: memberRole } = useWorkspace();
  const user = useAuthStore((s) => s.user);
  const router = useRouter();
  const supabase = getClientSupabase();
  const canCreate = PERMISSIONS.canCreateDocuments(memberRole);

  async function handleCreateDocument() {
    if (!activeWorkspace || !user) return;
    try {
      const newDoc = await workspaceDocumentService.createDocument(supabase, {
        workspace_id: activeWorkspace.id,
        title: "Untitled",
        content: defaultContent,
        created_by: user.id,
      });

      console.log("Created doc:", newDoc);
      router.push(`/workspace/${activeWorkspace.slug}/document/${newDoc.id}`);
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
            {canCreate ? "Manage and edit your workspace documents." : "View Documents in this workspace."}
          </p>
        </div>
        {documents && documents.length > 0 && canCreate && (
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
            { canCreate ? `Get started by creating your first document to capture thoughts,
            meeting notes, or documentation.` : `You currently have view-only access to this workspace.
            Ask the workspace owner to create documents.`}
          </p>
          {canCreate && (<Button onClick={handleCreateDocument} className="gap-2">
            <PlusIcon className="size-4" />
            Create First Document
          </Button>)}
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
              <div className="flex-1 min-w-0 flex flex-col">
                <p className="text-sm font-medium truncate">
                  {doc.title || "Untitled"}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Updated:{" "}
                  {format(
                    new Date(doc.updated_at || ""),
                    "dd-MMM-yyyy hh:mm a",
                  )}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkspaceComponent;
