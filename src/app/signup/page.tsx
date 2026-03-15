import Auth from "@/components/auth/auth";
import { Button } from "@/components/ui/button";

export default function SignUpPage() {
  return (
    <main className="h-screen">
      <div className="flex items-center justify-center h-full">
        <Auth type="signup" />
      </div>
    </main>
  );
}
