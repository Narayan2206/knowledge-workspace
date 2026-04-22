import { Documents, WorkspaceMembers, Workspaces } from "./supabase/models";
import { SupabaseClient } from "@supabase/supabase-js";

export const workspaceService = {
  async getAllWorkspaces(supabase: SupabaseClient, userId: string): Promise<Workspaces[]> {
    const { data, error } = await supabase
      .from("workspaces")
      .select("*")
      .eq("created_by", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return data || [];
  },

  async getWorkspaceBySlug(supabase: SupabaseClient, slug: string): Promise<Workspaces> {
    const { data, error } = await supabase
      .from("workspaces")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) throw error;

    return data;
  },

  async createWorkspace(
    supabase: SupabaseClient,
    workspace: Omit<Workspaces, "id" | "created_at">,
  ): Promise<Workspaces> {
    console.log("PAYLOAD ", workspace);
    
    const { data, error } = await supabase
      .from("workspaces")
      .insert(workspace)
      .select()
      .single();

    if (error) throw error;

    return data;
  },
};

export const workspaceMemberService = {
  // TODO
  async getWorkspaceMembers(
    supabase: SupabaseClient,
    userId: string,
    workspaceId: string,
  ): Promise<WorkspaceMembers[]> {
    const { data, error } = await supabase
      .from("workspace_members")
      .select("*, users (id, name, email, avatar)")
      .eq("workspace_id", workspaceId);
    //   .order("joined_at", { ascending: false });

    if (error) throw error;

    return data || [];
  },

  async addWorkspaceMember(
    supabase: SupabaseClient,
    workspace_member: Omit<WorkspaceMembers, "id" | "joined_at">,
  ): Promise<WorkspaceMembers> {
    const { data, error } = await supabase
      .from("workspace_members")
      .insert(workspace_member)
      .select()
      .single();

    if (error) throw error;

    return data;
  },
};

export const workspaceMemberDataService = {
  //! async createWorkspaceAndAddMember(data: {
  //   name: string;
  //   slug: string;
  //   userId: string;
  //   role: string;
  // }) {
  //   const workspace = await workspaceService.createWorkspace({
  //     created_by: data.userId,
  //     name: data.name,
  //     slug: data.slug,
  //   });

  //   await workspaceMemberService.addWorkspaceMember({
  //     workspace_id: workspace.id,
  //     user_id: data.userId,
  //     role: "admin",
  //   });

  //   return workspace;
  // },
};

export const workspaceDocumentService = {
  async createDocument(
    supabase: SupabaseClient,
    document: Omit<Documents, "id" | "created_at" | "updated_at" | "is_archived">,
  ): Promise<Documents> {
    console.log("PAYLOAD ", document);
    
    const { data, error } = await supabase
      .from("documents")
      .insert(document)
      .select()
      .single();

    if (error) throw error;

    return data;
  },

  async updateDocument(
    supabase: SupabaseClient,
    id: string,
    updates: Partial<Pick<Documents, "title" | "content" | "is_archived">>
  ): Promise<Documents> {
    const { data, error } = await supabase
      .from("documents")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return data;
  },

  async getDocumentsByWorkspaceId(
    supabase: SupabaseClient,
    workspace_id: string,
  ): Promise<Partial<Pick<Documents, "id" | "title" | "workspace_id" | "updated_at">>[]> {
    
    const { data, error } = await supabase
      .from("documents")
      .select("id, title, workspace_id, updated_at")
      .eq("workspace_id", workspace_id)
      .order("updated_at", { ascending: false });

    if (error) throw error;

    return data;
  },
}
