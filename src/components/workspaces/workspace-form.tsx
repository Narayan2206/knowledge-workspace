"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import CustomInput from "../CustomInput/CustomInput";

export function WorkspaceForm({
  onSubmit,
  isLoading,
}: {
  onSubmit: (name: string) => void;
  isLoading: boolean;
}) {
  const [workspaceName, setWorkspaceName] = useState("");

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (workspaceName.trim()) onSubmit(workspaceName);
    };

  return (
    <form onSubmit={handleSubmit}>
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
          type="submit"
          disabled={workspaceName.length < 3 || isLoading}
        >
          Create Workspace!
        </Button>
      </div>
    </form>
  );
}
