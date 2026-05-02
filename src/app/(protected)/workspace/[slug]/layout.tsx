import SidebarComponent from "@/components/Sidebar/SidebarComponent";

export default async function Layout({ children, params }: { children: React.ReactNode, params: Promise<{slug: string}> }) {
  const { slug } = await params;
  console.log("slug ", slug)
  return <SidebarComponent>{children}</SidebarComponent>;
}
