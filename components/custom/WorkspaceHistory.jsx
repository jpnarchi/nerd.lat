"use client"
import { UserDetailContext } from '@/context/UserDetailContext'
import { api } from '@/convex/_generated/api';
import { useConvex } from 'convex/react';

import React, { useContext, useEffect, useState } from 'react'
import { useSidebar } from '../ui/sidebar';
import Link from 'next/link';
import Lookup from '@/data/Lookup';

function WorkspaceHistory() {
    const {userDetail,setUserDetail}=useContext(UserDetailContext);
    const convex=useConvex();
    const [workspaceList,setWorkspaceList]=useState();
    const {toggleSidebar}=useSidebar();
    useEffect(()=>{
        userDetail&&GetAllWorkspace();
    },[userDetail])

    const GetAllWorkspace=async()=>{
        const result=await convex.query(api.workspace.GetAllWorkspace,{
            userId:userDetail?._id
        });
        setWorkspaceList(result);
        console.log(result);
    }
  return (
    <div>
        <h2 className='font-medium text-lg'>{Lookup.YOUR_CHATS_TEXT}</h2>
        <div>
            {workspaceList&&workspaceList?.map((workspace,index)=>(
                <Link href={'/workspace/'+workspace?._id} key={index}>
                    <h2 onClick={toggleSidebar} className='text-sm text-gray-400 my-4 
                    font-light cursor-pointer hover:text-white'>
                        {workspace?.messages[0]?.content}
                    </h2>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default WorkspaceHistory