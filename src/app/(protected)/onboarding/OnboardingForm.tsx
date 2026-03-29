"use client";

import CustomInput from "@/components/CustomInput/CustomInput";
import { Button } from "@/components/ui/button";
import { useState } from "react";

function OnboardingForm() {
  const [workspaceName, setWorkspaceName] = useState("");

    function handleSubmit(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        throw new Error("Function not implemented.");
    }

  return (
    <div>
      <p className="mb-4">Welcome 👋! Create your workspace to get started.</p>
      <div>
        <div className="mb-4">
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
        onClick={handleSubmit}
        // disabled={loading}
        >
            Create Workspace!
        </Button>
      </div>
    </div>
  );
}

export default OnboardingForm;
