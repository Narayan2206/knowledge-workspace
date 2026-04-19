import SidebarComponent from "@/components/Sidebar/SidebarComponent";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SidebarComponent>{children}</SidebarComponent>;
}
