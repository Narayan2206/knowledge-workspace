"use client";

import { useAuthStore } from "@/store/auth.store";

const DashboardComponent = () => {
  const user = useAuthStore((s) => s.user);
  return <div>congratulations {user?.user_metadata?.name} you are signed in.</div>;
};

export default DashboardComponent;
