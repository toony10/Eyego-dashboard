"use client"

import * as React from "react"
import {
  IconChartBar,
  IconListDetails,
  IconUser,
} from "@tabler/icons-react"

import { NavMain } from "@/components/dashboard/nav-main"
import { NavUser } from "@/components/dashboard/nav-user"
import { RiDashboardHorizontalFill } from "react-icons/ri"
import { useAppSelector } from "@/hooks/redux"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Skeleton } from "@/components/ui/skeleton"

const navItems = [
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
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, isAuthenticated, isLoading } = useAppSelector((state) => state.auth)

  const getUserData = () => {

    return {
      name: user?.displayName || user?.email?.split('@')[0] || 'User',
      email: user?.email || 'No email',
      avatar: user?.photoURL || '/avatars/default.jpg',
    }
  }

  const userData = getUserData()

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
        <NavMain items={ navItems } />
      </SidebarContent>
      <SidebarFooter>
        { isLoading ? (
          <div className="flex items-center space-x-3 p-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-3 w-32" />
            </div>
          </div>
        ) : (
          <NavUser user={ userData } />
        ) }
      </SidebarFooter>
    </Sidebar>
  )
}
