"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { logOut } from "@/features/auth";

type Props = {
  variant?: "default" | "outline" | "ghost" | "destructive";

  className?: string;
};

export default function LogoutButton({ variant = "ghost", className }: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    try {
      setLoading(true);

      await logOut();

      toast.success("Logged out successfully", { position: "top-center" });

      router.replace("/login");

      router.refresh();
    } catch (err) {
      console.error(err);

      toast.error("Failed to logout", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      variant={variant}
      className={className}
      onClick={handleLogout}
      disabled={loading}
    >
      <LogOut className="mr-2 h-4 w-4" />

      {loading ? "Logging out..." : "Logout"}
    </Button>
  );
}
