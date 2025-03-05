import React from 'react'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    useSidebar,
  } from "@/components/ui/sidebar"
import Image from 'next/image'
import { Button } from '../ui/button'
import { MessageCircleCode, SidebarClose } from 'lucide-react'
import WorkspaceHistory from './WorkspaceHistory'
import SideBarFooter from './SideBarFooter'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Lookup from '@/data/Lookup'
function AppSideBar() {
  const router=useRouter();
  const {toggleSidebar}=useSidebar();
  return (
    <Sidebar>
    <SidebarHeader className="p-5">
      <div className='flex justify-between items-center'>
      <Image src={'/logo_nerd.svg'} alt='log' width={90} height={90}/>
      <SidebarClose className='cursor-pointer h-6 w-6 font-thin' onClick={toggleSidebar} />
      </div>
        <Button className="mt-5"
        onClick={()=>router.push('/')}
        > <MessageCircleCode/>{Lookup.NEW_CHAT_TEXT}</Button>
    </SidebarHeader>
    <SidebarContent className="p-5 scrollbar-hide">
      <SidebarGroup>
        <WorkspaceHistory/>
        </SidebarGroup>
      {/* <SidebarGroup /> */}
    </SidebarContent>
    <SidebarFooter >
        <SideBarFooter/>
    </SidebarFooter>
  </Sidebar>
  )
}

export default AppSideBar