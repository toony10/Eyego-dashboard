'use client';
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useRouter } from 'next/navigation';
import { signOut } from "firebase/auth";
import { auth } from '@/app/firebase/config';

export function SiteHeader() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      document.cookie = 'authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
      console.log('Logged out');
      router.push('/login');
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };


  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">Dashboard</h1>
        <div className="ml-auto flex items-center gap-2">
        </div>
      </div>
    </header>
  )
}
