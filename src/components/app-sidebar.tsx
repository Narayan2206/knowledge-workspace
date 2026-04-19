"use client";

import * as React from "react";

import { NavFavorites } from "@/components/nav-favorites";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavWorkspaces } from "@/components/nav-workspaces";
// import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  TerminalIcon,
  AudioLinesIcon,
  SearchIcon,
  SparklesIcon,
  HomeIcon,
  InboxIcon,
  CalendarIcon,
  Settings2Icon,
  BlocksIcon,
  Trash2Icon,
  MessageCircleQuestionIcon,
  LayoutDashboard,
} from "lucide-react";
import { useWorkspaceStore } from "@/store/workspace.store";
import { WorkspaceSwitcher } from "./workspace-switcher";
import { useAuthStore } from "@/store/auth.store";
import { workspaceService } from "@/lib/services";
import { toast } from "sonner";

// This is sample data.
const data = {
  // teams: [
  //   {
  //     name: "Acme Inc",
  //     logo: (
  //       <TerminalIcon
  //       />
  //     ),
  //     plan: "Enterprise",
  //   },
  //   {
  //     name: "Acme Corp.",
  //     logo: (
  //       <AudioLinesIcon
  //       />
  //     ),
  //     plan: "Startup",
  //   },
  //   {
  //     name: "Evil Corp.",
  //     logo: (
  //       <TerminalIcon
  //       />
  //     ),
  //     plan: "Free",
  //   },
  // ],
  navMain: [
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
  navSecondary: [
    // {
    //   title: "Calendar",
    //   url: "#",
    //   icon: (
    //     <CalendarIcon
    //     />
    //   ),
    // },
    // {
    //   title: "Settings",
    //   url: "#",
    //   icon: (
    //     <Settings2Icon
    //     />
    //   ),
    // },
    // {
    //   title: "Templates",
    //   url: "#",
    //   icon: (
    //     <BlocksIcon
    //     />
    //   ),
    // },
    // {
    //   title: "Trash",
    //   url: "#",
    //   icon: (
    //     <Trash2Icon
    //     />
    //   ),
    // },
    // {
    //   title: "Help",
    //   url: "#",
    //   icon: (
    //     <MessageCircleQuestionIcon
    //     />
    //   ),
    // },
  ],
  favorites: [
    // {
    //   name: "Project Management & Task Tracking",
    //   url: "#",
    //   emoji: "📊",
    // },
    // {
    //   name: "Family Recipe Collection & Meal Planning",
    //   url: "#",
    //   emoji: "🍳",
    // },
    // {
    //   name: "Fitness Tracker & Workout Routines",
    //   url: "#",
    //   emoji: "💪",
    // },
    // {
    //   name: "Book Notes & Reading List",
    //   url: "#",
    //   emoji: "📚",
    // },
    // {
    //   name: "Sustainable Gardening Tips & Plant Care",
    //   url: "#",
    //   emoji: "🌱",
    // },
    // {
    //   name: "Language Learning Progress & Resources",
    //   url: "#",
    //   emoji: "🗣️",
    // },
    // {
    //   name: "Home Renovation Ideas & Budget Tracker",
    //   url: "#",
    //   emoji: "🏠",
    // },
    // {
    //   name: "Personal Finance & Investment Portfolio",
    //   url: "#",
    //   emoji: "💰",
    // },
    // {
    //   name: "Movie & TV Show Watchlist with Reviews",
    //   url: "#",
    //   emoji: "🎬",
    // },
    // {
    //   name: "Daily Habit Tracker & Goal Setting",
    //   url: "#",
    //   emoji: "✅",
    // },
  ],
  workspaces: [
    // {
    //   name: "Personal Life Management",
    //   emoji: "🏠",
    //   pages: [
    //     {
    //       name: "Daily Journal & Reflection",
    //       url: "#",
    //       emoji: "📔",
    //     },
    //     {
    //       name: "Health & Wellness Tracker",
    //       url: "#",
    //       emoji: "🍏",
    //     },
    //     {
    //       name: "Personal Growth & Learning Goals",
    //       url: "#",
    //       emoji: "🌟",
    //     },
    //   ],
    // },
    // {
    //   name: "Professional Development",
    //   emoji: "💼",
    //   pages: [
    //     {
    //       name: "Career Objectives & Milestones",
    //       url: "#",
    //       emoji: "🎯",
    //     },
    //     {
    //       name: "Skill Acquisition & Training Log",
    //       url: "#",
    //       emoji: "🧠",
    //     },
    //     {
    //       name: "Networking Contacts & Events",
    //       url: "#",
    //       emoji: "🤝",
    //     },
    //   ],
    // },
    // {
    //   name: "Creative Projects",
    //   emoji: "🎨",
    //   pages: [
    //     {
    //       name: "Writing Ideas & Story Outlines",
    //       url: "#",
    //       emoji: "✍️",
    //     },
    //     {
    //       name: "Art & Design Portfolio",
    //       url: "#",
    //       emoji: "🖼️",
    //     },
    //     {
    //       name: "Music Composition & Practice Log",
    //       url: "#",
    //       emoji: "🎵",
    //     },
    //   ],
    // },
    // {
    //   name: "Home Management",
    //   emoji: "🏡",
    //   pages: [
    //     {
    //       name: "Household Budget & Expense Tracking",
    //       url: "#",
    //       emoji: "💰",
    //     },
    //     {
    //       name: "Home Maintenance Schedule & Tasks",
    //       url: "#",
    //       emoji: "🔧",
    //     },
    //     {
    //       name: "Family Calendar & Event Planning",
    //       url: "#",
    //       emoji: "📅",
    //     },
    //   ],
    // },
    // {
    //   name: "Travel & Adventure",
    //   emoji: "🧳",
    //   pages: [
    //     {
    //       name: "Trip Planning & Itineraries",
    //       url: "#",
    //       emoji: "🗺️",
    //     },
    //     {
    //       name: "Travel Bucket List & Inspiration",
    //       url: "#",
    //       emoji: "🌎",
    //     },
    //     {
    //       name: "Travel Journal & Photo Gallery",
    //       url: "#",
    //       emoji: "📸",
    //     },
    //   ],
    // },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuthStore();
  const { workspaces, setWorkspaces, setIsLoadingWorkspaces } = useWorkspaceStore();
  React.useEffect(() => {
    let isMounted = true;
    if (workspaces.length === 0) {
      const fetchWorkspaces = async () => {
        if (!user?.id) {
          toast.error("User is not authenticated", { position: "top-center" });
          return;
        }

        try {
          const data = await workspaceService.getAllWorkspaces(user.id);

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
        <NavWorkspaces workspaces={data.workspaces} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
