"use client";
import { Button } from "@/components/ui/button";
import { logOut } from "@/features/auth";
import { useAuthStore } from "@/store/auth.store";
import Link from "next/link";

export default function Home() {
  const user = useAuthStore((s) => s.user);
  const handleLogout = async () => {
    const error = await logOut();
    if (error) {
      console.error("Error logging out user ", error);
    } else {
      console.log("User logged out successfully");
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
