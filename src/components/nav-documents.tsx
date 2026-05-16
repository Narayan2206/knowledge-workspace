"use client"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { ChevronRightIcon, PlusIcon, MoreHorizontalIcon } from "lucide-react"
import { Button } from "./ui/button"
import { workspaceDocumentService } from "@/lib/services"
import { useWorkspaceStore } from "@/store/workspace.store"
import { useAuthStore } from "@/store/auth.store"
import { toast } from "sonner"
import { useDocumentStore } from "@/store/document.store"
import { getClientSupabase } from "@/lib/supabase/client"
import { useWorkspace } from "./workspaces/workspace-provider"
import { useParams, useRouter } from "next/navigation"

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
  const {workspace: activeWorkspace, documents} = useWorkspace();
  const user = useAuthStore((s) => s.user);
  // const documents = useDocumentStore((s) => s.documents);
  const isLoadingDocuments = useDocumentStore((s) => s.isLoadingDocuments);
  const supabase = getClientSupabase();
  const router = useRouter();
  const params = useParams();

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
    <SidebarGroup>
      <div className="flex items-center justify-between px-2">
      <SidebarGroupLabel className="px-0">Documents</SidebarGroupLabel>
      <Button
      size={"xs"}
      variant="ghost"
      onClick={handleCreateDocument}
      className="text-sidebar-foreground/70 hover:text-sidebar-foreground"
    >
      <PlusIcon className="w-4 h-4" />
    </Button>
    </div>
      <SidebarGroupContent>
        <SidebarMenu>
          {isLoadingDocuments ? Array.from({ length: 3 }).map((_, i) => (
                <WorkspaceItemSkeleton key={i} />
              ))  : (documents.map((doc) => (
              <SidebarMenuItem key={doc.id}>
                <SidebarMenuButton 
                isActive={doc.id === params.docId}
                asChild
                className="cursor-pointer"
                onClick={(e) => {
                  if(doc.id === params.docId) return;
                  e.preventDefault();
                  router.push(`/workspace/${activeWorkspace.slug}/document/${doc.id}`)
                }}
                >
                  <span>{doc.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
          )))}
          {/* <SidebarMenuItem>
            <SidebarMenuButton className="text-sidebar-foreground/70">
              <MoreHorizontalIcon
              />
              <span>More</span>
            </SidebarMenuButton>
          </SidebarMenuItem> */}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

const WorkspaceItemSkeleton = () => (
  <div className="flex items-center gap-2 p-2">
    {/* <div className="size-6 animate-pulse rounded-md bg-muted" /> */}
    <div className="h-4 w-32 animate-pulse rounded bg-muted" />
  </div>
);