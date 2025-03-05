import { HelpCircle, LogOut, Settings, Wallet } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { googleLogout } from '@react-oauth/google';

function SideBarFooter() {
    const router=useRouter();
    const options=[
        // {
        //     name:'Configuración',
        //     icon:Settings,
        //     path:'/settings'
        // },
        // {
        //     name:'Ayuda',
        //     icon:HelpCircle,
        //     path:'help'
        // },
        {
            name:'Mi Subscripción',
            icon:Wallet,
            path:'/pricing'
        },
        {
            name:'Cerrar Sesión',
            icon:LogOut,
            path:'signOut'
        }
    ]

    const onOptionClick=(option)=>{
       
        if(option?.path=='signOut')
        {
            googleLogout();
            if(typeof window!==undefined)
            {
                localStorage.clear();
            }
            router.push('/');
            window.location.reload();
            return ;
        }
        router.push(option.path)
    }
  return (
    <div className='p-2 mb-10'>
        {options.map((option,index)=>(
            <Button variant="ghost" 
            onClick={()=>onOptionClick(option)}
            className="w-full flex justify-start my-3" key={index}>
                <option.icon/>
                {option.name}
            </Button>
        ))}
    </div>
  )
}

export default SideBarFooter