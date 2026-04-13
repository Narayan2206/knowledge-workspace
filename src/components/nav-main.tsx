"use client"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useRouter } from "next/navigation"
import { usePathname } from 'next/navigation'

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon: React.ReactNode
    isActive?: boolean
  }[]
}) {
  const router = useRouter();
  const pathname = usePathname();  
  return (
    <SidebarMenu>
      {items.map((item) => {
        const isActivePath = pathname.includes(item.url);
        return (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild isActive={isActivePath} onClick={() => router.push(item.url)}>
            <a href={item.url}>
              {item.icon}
              <span>{item.title}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      )})}
    </SidebarMenu>
  )
}
