import Image from 'next/image'
import React, { useContext, useState } from 'react'
import { Button } from '../ui/button'
import Colors from '@/data/Colors'
import { UserDetailContext } from '@/context/UserDetailContext'
import Link from 'next/link'
import { LucideDownload, Rocket } from 'lucide-react'
import { useSidebar } from '../ui/sidebar'
import { usePathname } from 'next/navigation'
import { ActionContext } from '@/context/ActionContext'
import SignInDialog from './SignInDialog'
import Lookup from '@/data/Lookup'

function Header() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const { toggleSidebar } = useSidebar();
  const { action, setAction } = useContext(ActionContext);
  const path = usePathname();
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  console.log(path?.includes('workspace'))

  const onActionBtn = (action) => {
    setAction({
      actionType: action,
      timeStamp: Date.now()
    })
  }

  return (
    <div className='relative p-4 flex justify-between items-center pr-8'>

      {/* Background rays */}
      <div className="absolute top-[-100px] left-[-150px] w-[200px] h-[200px] bg-[rgb(49,206,182)] rounded-full blur-[12rem] opacity-90 -z-10"></div>
      <div className="absolute top-[-150px] left-[250px] w-[250px] h-[250px] bg-[rgb(49,206,182)] rounded-full blur-[12rem] opacity-90 -z-10"></div>


      <Link href={'/'}>
        <Image src={'/logo_nerd.svg'} alt='Logo' width={90} height={90} />
      </Link>
      {!userDetail?.name ? <div className='flex gap-5'>
        <Button
          variant="ghost"
          onClick={setOpenLoginDialog}
        >
          {Lookup.LOGIN_TEXT}
        </Button>

        <Button
          onClick={setOpenLoginDialog}
          className="text-white"
          style={{
            backgroundColor: Colors.GREEN
          }}
        >
          {Lookup.GET_STARTED_TEXT}
        </Button>
      </div> :
        path?.includes('workspace') &&
        <div className='flex gap-2 items-center'>
          <Button variant="ghost" onClick={() => onActionBtn('export')} ><LucideDownload />{Lookup.EXPORT_TEXT}</Button>
          <Button className="bg-[#008d78] text-white hover:bg-[#008d78]"
            onClick={() => onActionBtn('deploy')}><Rocket />{Lookup.DEPLOY_TEXT}</Button>

        </div>
      }
      {userDetail && <Image src={userDetail?.picture} alt='user' width={30} height={30}
        className='rounded-full w-[30px] cursor-pointer'
        onClick={toggleSidebar}
      />}

      <SignInDialog openDialog={openLoginDialog} closeDialog={setOpenLoginDialog} />
    </div>
  )
}

export default Header