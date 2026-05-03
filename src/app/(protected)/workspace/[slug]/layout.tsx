import SidebarComponent from "@/components/Sidebar/SidebarComponent";
import { WorkspaceProvider } from "@/components/workspaces/workspace-provider";
import { workspaceDocumentService, workspaceService } from "@/lib/services";
import { Workspaces, Documents } from "@/lib/supabase/models";
import { getServerSupabase } from "@/lib/supabase/server";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await getServerSupabase();
  console.log("slug ", slug);
  const workspace = await workspaceService.getWorkspaceBySlug(supabase, slug);
  const documents = await workspaceDocumentService.getDocumentsByWorkspaceId(
    supabase,
    workspace.id,
  );

  console.log("DOCUMENTS AND WORKSPACE SERVER", workspace, documents)
  return (
    <WorkspaceProvider workspace={workspace} documents={documents}>
      <SidebarComponent>{children}</SidebarComponent>
    </WorkspaceProvider>
  );
}
