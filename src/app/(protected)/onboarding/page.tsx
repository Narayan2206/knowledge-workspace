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

  if(user?.user_metadata?.has_completed_onboarding){
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
