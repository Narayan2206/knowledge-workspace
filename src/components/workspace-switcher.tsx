"use client";

import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ChevronDownIcon, PlusIcon } from "lucide-react";
import { Workspaces } from "@/lib/supabase/models";
import { CreateWorkspaceModal } from "./workspaces/create-workspace-modal";
import { useWorkspaceStore } from "@/store/workspace.store";

export function WorkspaceSwitcher() {
  const workspaces = useWorkspaceStore((s) => s.workspaces);
  const activeWorkspace = useWorkspaceStore((s) => s.activeWorkspace);
  const isLoadingActive = useWorkspaceStore((s) => s.isLoadingActiveWorkspace);
  const isLoadingWorkspaces = useWorkspaceStore((s) => s.isLoadingWorkspaces);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton className="w-fit px-1.5">
              {/* <div className="flex aspect-square size-5 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                {activeTeam.logo}
              </div> */}
              <span className="truncate font-medium">
                {isLoadingActive ? (
                  <div className="h-4 w-24 animate-pulse bg-muted rounded" />
                ) : (
                  activeWorkspace?.name || "Select Workspace"
                )}
              </span>
              <ChevronDownIcon className="opacity-50" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-64 rounded-lg"
            align="start"
            side="bottom"
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Workspaces
            </DropdownMenuLabel>
            {isLoadingWorkspaces ? (
              // Render 3 skeletons while loading the list
              Array.from({ length: 3 }).map((_, i) => (
                <WorkspaceItemSkeleton key={i} />
              ))
            ) : workspaces.length > 0 ? (
              workspaces.map((workspace) => (
                <DropdownMenuItem key={workspace.id} className="gap-2 p-2">
                  {workspace.name}
                </DropdownMenuItem>
              ))
            ) : (
              <div className="p-2 text-xs text-muted-foreground">
                No workspaces found
              </div>
            )}
            <DropdownMenuSeparator />

            <CreateWorkspaceModal
              trigger={
                <DropdownMenuItem
                  className="gap-2 p-2"
                  onSelect={(e) => e.preventDefault()}
                >
                  <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                    <PlusIcon className="size-4" />
                  </div>
                  <div className="font-medium text-muted-foreground">
                    Add workspace
                  </div>
                </DropdownMenuItem>
              }
            />
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

const WorkspaceItemSkeleton = () => (
  <div className="flex items-center gap-2 p-2">
    {/* <div className="size-6 animate-pulse rounded-md bg-muted" /> */}
    <div className="h-4 w-32 animate-pulse rounded bg-muted" />
  </div>
);
