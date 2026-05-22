"use client";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Ellipsis, Loader2Icon, PlusIcon, Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";
import { workspaceDocumentService } from "@/lib/services";
import { useAuthStore } from "@/store/auth.store";
import { toast } from "sonner";
import { useDocumentStore } from "@/store/document.store";
import { getClientSupabase } from "@/lib/supabase/client";
import { useWorkspace } from "./workspaces/workspace-provider";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { PERMISSIONS } from "@/lib/permissions";

const defaultContent = {
  type: "doc",
  content: [
    {
      type: "paragraph",
    },
  ],
};

export function NavDocuments() {
  const {
    workspace: activeWorkspace,
    documents,
    role: memberRole,
  } = useWorkspace();
  const canCreate = PERMISSIONS.canCreateDocuments(memberRole);
  const canDelete = PERMISSIONS.canDeleteDocuments(memberRole);
  const user = useAuthStore((s) => s.user);
  const isLoadingDocuments = useDocumentStore((s) => s.isLoadingDocuments);
  const supabase = getClientSupabase();
  const router = useRouter();
  const params = useParams();
  const [activeDeleteDoc, setActiveDeleteDoc] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleCreateDocument() {
    if (!activeWorkspace || !user) return;
    try {
      const newDoc = await workspaceDocumentService.createDocument(supabase, {
        workspace_id: activeWorkspace.id,
        title: "Untitled",
        content: defaultContent,
        created_by: user.id,
      });

      router.push(`/workspace/${activeWorkspace.slug}/document/${newDoc.id}`);
      router.refresh();
    } catch (err:any) {
      console.error(err);
      toast.error(err?.message || "Error creating document ", { position: "top-center" });
    }
  }

  async function handleDeleteDocument(docId: string | undefined) {
    if (!activeWorkspace || !user || !docId) return;
    try {
      setIsDeleting(true);
      await workspaceDocumentService.deleteDocument(supabase, docId);
      toast.success("Document deleted", { position: "top-center" });
      setActiveDeleteDoc(null);
      router.replace(`/workspace/${activeWorkspace.slug}`);
      router.refresh();
    } catch (err:any) {
      console.error(err);
      toast.error(err?.message || "Failed to delete document", { position: "top-center" });
    } finally {
      setIsDeleting(false);
    }
  }
  return (
    <>
      <SidebarGroup>
        <div className="flex items-center justify-between px-2">
          {/* If current user is Viewer and there are no documents, then the sidebar shows Documents with empty listing, so to hide that, this condition is applied */}
          {!(!canCreate && documents.length === 0) && (<SidebarGroupLabel className="px-0">Documents</SidebarGroupLabel>)}
          {documents.length > 0 && canCreate && (
            <Button
              size={"xs"}
              variant="ghost"
              onClick={handleCreateDocument}
              className="text-sidebar-foreground/70 hover:text-sidebar-foreground cursor-pointer"
            >
              <PlusIcon className="w-4 h-4" />
            </Button>
          )}
        </div>
        <SidebarGroupContent>
          <SidebarMenu>
            {isLoadingDocuments
              ? Array.from({ length: 3 }).map((_, i) => (
                  <WorkspaceItemSkeleton key={i} />
                ))
              : documents.map((doc) => (
                  <SidebarMenuItem key={doc.id}>
                    <SidebarMenuButton
                      isActive={doc.id === params.docId}
                      asChild
                      className="cursor-pointer"
                    >
                      <Link
                        href={`/workspace/${activeWorkspace.slug}/document/${doc.id}`}
                      >
                        <span>{doc.title}</span>
                      </Link>
                    </SidebarMenuButton>
                    {canDelete && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <SidebarMenuAction className="cursor-pointer">
                            <Ellipsis />
                          </SidebarMenuAction>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          side="right"
                          align="start"
                          className="w-48 bg-zinc-950 border-zinc-800 text-zinc-300"
                        >
                          <DropdownMenuItem
                            disabled={isDeleting}
                            onClick={() =>
                              setActiveDeleteDoc({
                                id: doc?.id || "",
                                title: doc?.title || "",
                              })
                            }
                            className="gap-2 text-red-400 focus:text-red-400 focus:bg-red-950/30 cursor-pointer"
                          >
                            <Trash2Icon className="size-4" />
                            <span>Delete document</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </SidebarMenuItem>
                ))}
            {documents.length === 0 && canCreate && (
              <SidebarMenuItem>
                <SidebarMenuButton
                  className="text-sidebar-foreground/70"
                  onClick={handleCreateDocument}
                >
                  <PlusIcon />
                  <span>New Document</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <AlertDialog
        open={activeDeleteDoc !== null}
        onOpenChange={(isOpen) => !isOpen && setActiveDeleteDoc(null)}
      >
        <AlertDialogContent className="bg-zinc-950 border-zinc-800 max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground text-lg font-semibold tracking-tight">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-muted-foreground mt-1">
              This action cannot be undone. This will permanently delete the
              document{" "}
              <span className="text-zinc-200 font-medium font-mono text-xs px-1 py-0.5 bg-zinc-900 border border-zinc-800 rounded">
                {activeDeleteDoc?.title}
              </span>{" "}
              and remove its data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-6 gap-2">
            <AlertDialogCancel
              disabled={isDeleting}
              className="border-zinc-800 bg-transparent text-muted-foreground hover:bg-zinc-900 hover:text-foreground transition-colors"
            >
              Cancel
            </AlertDialogCancel>
            <Button
              variant="destructive"
              disabled={isDeleting}
              onClick={() => handleDeleteDocument(activeDeleteDoc?.id)}
              className="bg-red-600 hover:bg-red-500 text-white gap-2"
            >
              {isDeleting ? (
                <>
                  <Loader2Icon className="size-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete document"
              )}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

const WorkspaceItemSkeleton = () => (
  <div className="flex items-center gap-2 p-2">
    {/* <div className="size-6 animate-pulse rounded-md bg-muted" /> */}
    <div className="h-4 w-32 animate-pulse rounded bg-muted" />
  </div>
);
