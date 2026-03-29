"use client";
import { Button } from "@/components/ui/button";
import { workspaceService } from "@/lib/services";
import { createClient } from "@/lib/supabase/client";
import { useAuthStore } from "@/store/auth.store";

const Workspace = () => {
  const user = useAuthStore((s) => s.user);
  const supabase = createClient();

  const checkSession = async () => {
  const { data } = await supabase.auth.getSession();
  console.log("SESSION:", data.session);
};

  const handleCreateWorkspace = async () => {
    checkSession();

    const { data } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    try {
      const response = await workspaceService.createWorkspace({
        name: "Narayan's Workspace",
        slug: "juice-world",
        created_by: user.id,
      });
      console.log("RESPONSE CREATE WORKSPACE ", response);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <Button onClick={handleCreateWorkspace}>Create Workspace</Button>
    </div>
  );
};

export default Workspace;
