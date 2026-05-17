import { Suspense } from "react";

import SidebarSkeleton from "@/components/Sidebar/SidebarSkeleton";
import SidebarServer from "./SidebarServer";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <Suspense fallback={<SidebarSkeleton />}>
      <SidebarServer slug={slug}>
        {children}
      </SidebarServer>
    </Suspense>
  );
}