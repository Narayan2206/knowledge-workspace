"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useWorkspaceStore } from "@/store/workspace.store";

export function WorkspaceStateCleaner() {
  const pathname = usePathname();
  const activeWorkspace = useWorkspaceStore((s) => s.activeWorkspace);
  const reset = useWorkspaceStore((s) => s.reset);

  useEffect(() => {
    if (!pathname.startsWith("/workspace") && activeWorkspace !== null) {
      reset();
    }
  }, [pathname, reset]);

  return null;
}