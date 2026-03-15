import { Button } from "@/components/ui/button";
import Auth from "@/components/auth/auth";

export default function LoginPage() {
  return (
    <main className="h-screen">
      <div className="flex items-center justify-center h-full">
        <Auth type="login" />
      </div>
    </main>
  );
}
