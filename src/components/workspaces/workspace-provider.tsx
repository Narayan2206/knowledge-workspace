"use client";

import { Documents, Workspaces } from "@/lib/supabase/models";
import { createContext, useContext } from "react";

type WorkspaceContextType = {
  workspace: Workspaces;
  documents: Partial<
    Pick<Documents, "id" | "title" | "workspace_id" | "updated_at">
  >[];
  role: "owner" | "editor" | "viewer";
};

const WorkspaceContext = createContext<WorkspaceContextType | null>(null);

export function WorkspaceProvider({
  workspace,
  documents,
  role,
  children,
}: {
  workspace: Workspaces;
  documents: Partial<
    Pick<Documents, "id" | "title" | "workspace_id" | "updated_at">
  >[];
  role: "owner" | "editor" | "viewer";
  children: React.ReactNode;
}) {
  return (
    <WorkspaceContext.Provider value={{ workspace, documents, role }}>
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);

  if (!context) {
    throw new Error("useWorkspace must be used within WorkspaceProvider");
  }

  return context;
}
