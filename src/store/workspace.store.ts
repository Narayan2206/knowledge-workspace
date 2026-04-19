import { Workspaces } from "@/lib/supabase/models";
import { create } from "zustand";

interface WorkspaceState {
  workspaces: Workspaces[];
  activeWorkspace: Workspaces | null;
  isLoadingWorkspaces: boolean;
  isLoadingActiveWorkspace: boolean;
  //   members: any[];
  //   currentUserRole: string | null;

  setWorkspaces: (workspaces: Workspaces[]) => void;
  addWorkspace: (newWorkspace: Workspaces) => void;
  setActiveWorkspace: (workspace: Workspaces) => void;
  setIsLoadingWorkspaces: (loading: boolean) => void;
  setIsLoadingActiveWorkspace: (loading: boolean) => void;

  reset: () => void;
  //   setMembers: (members: any[]) => void;
}

const initialState = {
  workspaces: [],
  activeWorkspace: null,
  members: [],
  currentUserRole: null,
  isLoadingWorkspaces: true,
  isLoadingActiveWorkspace: true,
};

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  ...initialState,

  setWorkspaces: (workspaces) => set({ workspaces }),
  addWorkspace: (newWorkspace: Workspaces) =>
    set((state) => ({
      workspaces: [newWorkspace, ...state.workspaces],
    })),

  setActiveWorkspace: (workspace) => set({ activeWorkspace: workspace }),

  setIsLoadingWorkspaces: (loading) => set({ isLoadingWorkspaces: loading }),
  setIsLoadingActiveWorkspace: (loading) =>
    set({ isLoadingActiveWorkspace: loading }),

  //   setMembers: (members) => set({ members }),
  reset: () => set(initialState),
}));
