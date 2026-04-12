import { Workspaces } from "@/lib/supabase/models";
import { create } from "zustand";

interface WorkspaceState {
  workspaces: Workspaces[];
  //   activeWorkspace: any | null;
  //   members: any[];
  //   currentUserRole: string | null;

  setWorkspaces: (workspaces: Workspaces[]) => void;
  addWorkspace: (newWorkspace: Workspaces) => void;
  //   setActiveWorkspace: (workspaceId: string) => void;
  //   setMembers: (members: any[]) => void;
}

export const useWorkspaceStore = create<WorkspaceState>((set, get) => ({
  workspaces: [],
  activeWorkspace: null,
  members: [],
  currentUserRole: null,

  setWorkspaces: (workspaces) => set({ workspaces }),
  addWorkspace: (newWorkspace: Workspaces) => 
    set((state) => ({ 
      workspaces: [newWorkspace, ...state.workspaces] 
    })),

  //   setActiveWorkspace: (workspaceId) => {
  //     const workspace = get().workspaces.find((w) => w.id === workspaceId);
  //     set({ activeWorkspace: workspace || null });
  //   },

  //   setMembers: (members) => set({ members }),
}));
