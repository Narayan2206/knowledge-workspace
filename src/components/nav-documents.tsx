"use client";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { PlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import { workspaceDocumentService } from "@/lib/services";
import { useAuthStore } from "@/store/auth.store";
import { toast } from "sonner";
import { useDocumentStore } from "@/store/document.store";
import { getClientSupabase } from "@/lib/supabase/client";
import { useWorkspace } from "./workspaces/workspace-provider";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

const defaultContent = {
  type: "doc",
  content: [
    {
      type: "paragraph",
    },
  ],
};

export function NavDocuments() {
  // const activeWorkspace = useWorkspaceStore((s) => s.activeWorkspace);
  const { workspace: activeWorkspace, documents } = useWorkspace();
  const user = useAuthStore((s) => s.user);
  // const documents = useDocumentStore((s) => s.documents);
  const isLoadingDocuments = useDocumentStore((s) => s.isLoadingDocuments);
  const supabase = getClientSupabase();
  const router = useRouter();
  const params = useParams();

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
    <SidebarGroup>
      <div className="flex items-center justify-between px-2">
        <SidebarGroupLabel className="px-0">Documents</SidebarGroupLabel>
        {documents.length > 0 && (
          <Button
            size={"xs"}
            variant="ghost"
            onClick={handleCreateDocument}
            className="text-sidebar-foreground/70 hover:text-sidebar-foreground"
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
                </SidebarMenuItem>
              ))}
          {documents.length === 0 && (
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
  );
}

const WorkspaceItemSkeleton = () => (
  <div className="flex items-center gap-2 p-2">
    {/* <div className="size-6 animate-pulse rounded-md bg-muted" /> */}
    <div className="h-4 w-32 animate-pulse rounded bg-muted" />
  </div>
);
