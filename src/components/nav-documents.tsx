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

const defaultContent = {
  type: "doc",
  content: [
    {
      type: "paragraph",
    },
  ],
};

export function NavDocuments() {
  const activeWorkspace = useWorkspaceStore((s) => s.activeWorkspace);
  const user = useAuthStore((s) => s.user);

  async function handleCreateDocument() {
    if(!activeWorkspace || !user) return;
  try {
    const newDoc = await workspaceDocumentService.createDocument({
      workspace_id: activeWorkspace.id,
      title: "Untitled",
      content: defaultContent,
      created_by: user.id, 
    });

    console.log("Created doc:", newDoc);
  } catch (err) {
    console.error(err);
    toast.error("Error creating document ", { position: "top-center" });
  }
}
  return (
    <SidebarGroup>
      <div className="flex items-center justify-between px-2">
      <SidebarGroupLabel>Documents</SidebarGroupLabel>
      <Button
      variant="ghost"
      onClick={handleCreateDocument}
      className="text-sidebar-foreground/70 hover:text-sidebar-foreground"
    >
      <PlusIcon className="w-4 h-4" />
    </Button>
    </div>
      <SidebarGroupContent>
        <SidebarMenu>
          {[].map((workspace:any) => (
            <Collapsible key={workspace.name}>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <span>{workspace.emoji}</span>
                    <span>{workspace.name}</span>
                  </a>
                </SidebarMenuButton>
                <CollapsibleTrigger asChild>
                  <SidebarMenuAction
                    className="left-2 bg-sidebar-accent text-sidebar-accent-foreground data-[state=open]:rotate-90"
                    showOnHover
                  >
                    <ChevronRightIcon
                    />
                  </SidebarMenuAction>
                </CollapsibleTrigger>
                <SidebarMenuAction showOnHover>
                  <PlusIcon
                  />
                </SidebarMenuAction>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {workspace.pages.map((page:any) => (
                      <SidebarMenuSubItem key={page.name}>
                        <SidebarMenuSubButton asChild>
                          <a href="#">
                            <span>{page.emoji}</span>
                            <span>{page.name}</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ))}
          <SidebarMenuItem>
            <SidebarMenuButton className="text-sidebar-foreground/70">
              <MoreHorizontalIcon
              />
              <span>More</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
