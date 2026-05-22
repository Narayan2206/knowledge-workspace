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

  async getWorkspaceBySlug(supabase: SupabaseClient, slug: string): Promise<Workspaces|null> {
    const { data, error } = await supabase
      .from("workspaces")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

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

  async updateWorkspace(
    supabase: SupabaseClient,
    workspaceId: string,
    newName: string,
  ): Promise<Workspaces> {
    
    const { data, error } = await supabase
      .from("workspaces")
      .update({name: newName.trim()})
      .eq('id', workspaceId)
      .select()
      .maybeSingle();

    if (error) throw error;

    if (!data) {
      throw new Error(
        "You do not have permission to update this workspace"
      );
    }

    return data;
  },

  async deleteWorkspace(
    supabase: SupabaseClient,
    workspaceId: string,
    ): Promise<void> {
      const { data, error } = await supabase
        .from("workspaces")
        .delete()
        .eq("id", workspaceId)
        .select();

      if (error) throw error;
      if (!data || data.length === 0) {
        throw new Error(
          "You do not have permission to delete this workspace"
        );
      }
    },
};

export const workspaceMemberService = {

  async getWorkspaceMember(
    supabase: SupabaseClient,
    workspaceId: string,
    userId: string,
  ): Promise<WorkspaceMembers | null> {

    const { data, error } = await supabase
      .from("workspace_members")
      .select("*")
      .eq("workspace_id", workspaceId)
      .eq("user_id", userId)
      .maybeSingle();

    if (error) throw error;

    return data;
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
    updates: Partial<Pick<Documents, "title" | "content" | "is_archived">>,
    workspace_id: string,
  ): Promise<Documents|null> {
    
    const { data, error } = await supabase
      .from("documents")
      .update(updates)
      .eq("id", id)
      .eq("workspace_id", workspace_id)
      .select()
      .maybeSingle();

    if (error) throw error;
    if (!data) throw new Error("Document not found after update");

    return data;
  },

  async deleteDocument(
    supabase: SupabaseClient,
    documentId: string,
    ): Promise<void> {
      const { data, error } = await supabase
        .from("documents")
        .delete()
        .eq("id", documentId)
        .select();
        
      if (error) throw error;
      if (!data || data.length === 0) {
        throw new Error(
          "You do not have permission to delete this document"
        );
      }
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

  async getDocumentById(
    supabase: SupabaseClient,
    document_id: string,
  ): Promise<Documents|null> {
    
    const { data, error } = await supabase
      .from("documents")
      .select("*")
      .eq("id", document_id)
      .maybeSingle();

    if (error) throw error;

    return data;
  },
}
