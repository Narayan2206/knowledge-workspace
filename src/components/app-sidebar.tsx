"use client";

import * as React from "react";

import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  HomeIcon,
  LayoutDashboard,
} from "lucide-react";
import { useWorkspaceStore } from "@/store/workspace.store";
import { WorkspaceSwitcher } from "./workspace-switcher";
import { useAuthStore } from "@/store/auth.store";
import { workspaceService } from "@/lib/services";
import { toast } from "sonner";
import { NavDocuments } from "./nav-documents";
import { getClientSupabase } from "@/lib/supabase/client";
import LogoutButton from "./auth/logout-button";

const data = {
  navMain: [
    // * Future Implementation plans
    // {
    //   title: "Search",
    //   url: "#",
    //   icon: (
    //     <SearchIcon
    //     />
    //   ),
    // },
    // {
    //   title: "Ask AI",
    //   url: "#",
    //   icon: (
    //     <SparklesIcon
    //     />
    //   ),
    // },
    {
      title: "Home",
      url: "/",
      icon: <HomeIcon />,
    },
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <LayoutDashboard />,
    },
  ],
  
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, isLoading } = useAuthStore();
  const { workspaces, setWorkspaces, setIsLoadingWorkspaces } =
    useWorkspaceStore();
  const supabase = getClientSupabase();
  React.useEffect(() => {
    let isMounted = true;
    if (workspaces.length === 0) {
      const fetchWorkspaces = async () => {
        if (!user?.id || isLoading) {
          return;
        }

        try {
          const data = await workspaceService.getAllWorkspaces(
            supabase,
            user.id,
          );

          if (isMounted) {
            setWorkspaces(data || []);
          }
        } catch (error) {
          console.error("Failed to fetch workspaces:", error);
          toast.error("Failed to fetch workspaces", { position: "top-center" });
        } finally {
          if (isMounted) {
            setIsLoadingWorkspaces(false);
          }
        }
      };

      fetchWorkspaces();
    }

    return () => {
      isMounted = false;
    };
  }, [user, workspaces.length]);

  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <WorkspaceSwitcher />
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarContent>
        {/* <NavFavorites favorites={data.favorites} /> */}
        <NavDocuments />
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-zinc-800/50">
        <LogoutButton
          variant="outline"
          className="w-full justify-start gap-2 border-zinc-800 hover:bg-zinc-900 text-muted-foreground hover:text-foreground"
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
