// components/Sidebar/SidebarServer.tsx

import SidebarComponent from "@/components/Sidebar/SidebarComponent";
import { WorkspaceProvider } from "@/components/workspaces/workspace-provider";
import { workspaceDocumentService, workspaceService } from "@/lib/services";
import { getServerSupabase } from "@/lib/supabase/server";

export default async function SidebarServer({
  slug,
  children,
}: {
  slug: string;
  children: React.ReactNode;
}) {
  const supabase = await getServerSupabase();

  const workspace = await workspaceService.getWorkspaceBySlug(supabase, slug);

  const documents = await workspaceDocumentService.getDocumentsByWorkspaceId(
    supabase,
    workspace.id,
  );

  console.log("DOCUMENTS AND WORKSPACE SidebarServer", workspace, documents);

  return (
    <WorkspaceProvider workspace={workspace} documents={documents}>
      <SidebarComponent>{children}</SidebarComponent>
    </WorkspaceProvider>
  );
}
