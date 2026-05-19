// components/Sidebar/SidebarServer.tsx

import SidebarComponent from "@/components/Sidebar/SidebarComponent";
import { WorkspaceProvider } from "@/components/workspaces/workspace-provider";
import {
  workspaceDocumentService,
  workspaceMemberService,
  workspaceService,
} from "@/lib/services";
import { getServerSupabase } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export default async function SidebarServer({
  slug,
  children,
}: {
  slug: string;
  children: React.ReactNode;
}) {
  const supabase = await getServerSupabase();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    notFound();
  }

  const workspace = await workspaceService.getWorkspaceBySlug(supabase, slug);

  if (!workspace) {
    notFound();
  }

  const member = await workspaceMemberService.getWorkspaceMember(
    supabase,
    workspace.id,
    user.id,
  );

  if (!member) {
    notFound();
  }

  const documents = await workspaceDocumentService.getDocumentsByWorkspaceId(
    supabase,
    workspace.id,
  );

  console.log("DOCUMENTS, WORKSPACE AND MEMBER SidebarServer", workspace, documents, member);

  return (
    <WorkspaceProvider workspace={workspace} documents={documents} role={member.role}>
      <SidebarComponent>{children}</SidebarComponent>
    </WorkspaceProvider>
  );
}
