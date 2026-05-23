import { getServerSupabase } from "@/lib/supabase/server";
import OnboardingForm from "./OnboardingForm";
import { redirect } from "next/navigation";
import { workspaceService } from "@/lib/services";

async function Onboarding() {
  const supabase = await getServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  
  if (!user) {
    redirect("/login");
  }
  const workspaces = await workspaceService.getAllWorkspaces(supabase, user.id);

  if (workspaces.length > 0) {
    redirect("/dashboard");
  }
  return (
    <main className="h-screen">
      <div className="flex items-center justify-center h-full">
        <OnboardingForm />
      </div>
    </main>
  );
}

export default Onboarding;
