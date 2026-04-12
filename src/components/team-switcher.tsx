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

export function TeamSwitcher({ workspaces }: { workspaces: Workspaces[] }) {
  const [activeTeam, setActiveTeam] = React.useState("adwads");

  if (!activeTeam) {
    return null;
  }
  console.log("WORKSPACES ", workspaces);
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
                Active Workspace name
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
            {workspaces.map((workspace) => (
              <DropdownMenuItem
                key={workspace.id}
                onClick={() => {}}
                className="gap-2 p-2"
              >
                {/* <div className="flex size-6 items-center justify-center rounded-xs border">
                  {workspace.logo}
                </div> */}
                {workspace.name}
                {/* <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut> */}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />

            <CreateWorkspaceModal
              trigger={
                <DropdownMenuItem className="gap-2 p-2" onSelect={(e) => e.preventDefault()}>
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
