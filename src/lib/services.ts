import { createClient } from "@/lib/supabase/client";
import { WorkspaceMembers, Workspaces } from "./supabase/models";

const supabase = createClient();

export const workspaceService = {
  async getAllWorkspaces(userId: string): Promise<Workspaces[]> {
    const { data, error } = await supabase
      .from("workspaces")
      .select("*")
      .eq("created_by", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return data || [];
  },

  async createWorkspace(
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
