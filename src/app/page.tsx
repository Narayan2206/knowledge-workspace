"use client";
import { Button } from "@/components/ui/button";
import { logOut } from "@/features/auth";
import { useAuthStore } from "@/store/auth.store";
import Link from "next/link";
import { toast } from "sonner";

export default function Home() {
  const user = useAuthStore((s) => s.user);
  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("Logged out successfully", {position: "top-center"});
    } catch (error) {
      console.error("Error logging out ", error);
      toast.error("Error logging out", {position: "top-center"});
    }
  };
  return (
    <header>
      <div>
        {user ? (
          <Button onClick={handleLogout}>Logout</Button>
        ) : (
          <>
            <Link href={"/login"}>Login</Link>
            <Link href={"/signup"}>Signup</Link>
          </>
        )}
      </div>
      {user && <p>Welcome {user?.user_metadata?.email}</p>}
    </header>
  );
}
