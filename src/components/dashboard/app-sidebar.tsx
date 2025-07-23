"use client"

import * as React from "react"
import {
  IconChartBar,
  IconListDetails,
} from "@tabler/icons-react"

import { NavMain } from "@/components/dashboard/nav-main"
import { NavUser } from "@/components/dashboard/nav-user"
import { RiDashboardHorizontalFill } from "react-icons/ri";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Statistics",
      url: "/dashboard/statistics",
      icon: IconChartBar,
    },
    {
      title: "Products",
      url: "/dashboard/products",
      icon: IconListDetails,
    }
  ],

}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" { ...props }>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <RiDashboardHorizontalFill />
                <span className="text-base font-semibold">Eyego Dashboard</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={ data.navMain } />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={ data.user } />
      </SidebarFooter>
    </Sidebar>
  )
}
