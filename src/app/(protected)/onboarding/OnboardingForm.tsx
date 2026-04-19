"use client";

import CustomInput from "@/components/CustomInput/CustomInput";
import { Button } from "@/components/ui/button";
import { workspaceService } from "@/lib/services";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

function OnboardingForm() {
  const [workspaceName, setWorkspaceName] = useState("");
  const user = useAuthStore((s) => s.user);
  const router = useRouter();

  const handleCreateWorkspace = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): Promise<void> => {
    e.preventDefault();

    if (!user) {
      toast.error("User is not authenticated", { position: "top-center" });
      return;
    }

    try {
        const workspace = await workspaceService.createWorkspace({
          name: workspaceName,
          slug: `${Date.now()}-${Math.random()}`,
          created_by: user.id,
        });
        console.log("Response ", workspace);
      if (workspace?.slug) {
        router.replace(`/workspace/${workspace.slug}`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Unable to Create workspace", { position: "top-center" });
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 basis-10/12 md:basis-1/3">
      <p>Welcome! 👋</p>
      <p> Create your workspace to get started.</p>
      <div className="w-full">
        <div className="mb-8">
          <CustomInput
            label="Workspace Name"
            value={workspaceName}
            onChange={setWorkspaceName}
            placeholder="Enter your workspace name"
            type="text"
            required
          />
        </div>
        <Button
          className="w-full"
          onClick={handleCreateWorkspace}
          disabled={workspaceName.length < 3}
        >
          Create Workspace!
        </Button>
      </div>
    </div>
  );
}

export default OnboardingForm;
