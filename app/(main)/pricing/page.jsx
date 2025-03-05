"use client"
import PricingModel from '@/components/custom/PricingModel'
import { UserDetailContext } from '@/context/UserDetailContext'
import Colors from '@/data/Colors'
import Lookup from '@/data/Lookup'
import React, { useContext, useState } from 'react'

function Pricing() {
    const {userDetail,setUserDetail}=useContext(UserDetailContext)
  return (
    <div className='mt-10 flex flex-col items-center w-full p-10 md:px-32 lg:px-48'>
        <h2 className='font-bold text-5xl'>{Lookup.PRICING_TEXT}</h2>
        <p className='text-gray-400 max-w-xl text-center mt-4'>{Lookup.PRICING_DESC}</p>
    
        <div className='p-5 border rounded-xl w-full flex justify-between mt-7 items-center'
        style={{
            backgroundColor:Colors.BACKGROUND
        }}>
            <h2 className='text-lg'>{Lookup.YOU_HAVE_TEXT + " "}<span className='font-bold'>{userDetail?.token}</span>{" " + Lookup.TOKENS_TEXT}</h2>
            <div className=''>
                <h2 className='font-medium'>{Lookup.NEED_MORE_TOKENS_TEXT}</h2>
                <p>{Lookup.UPGRADE_YOUR_PLAN_TEXT}</p>
            </div>
        </div>
        <PricingModel/>
    </div>
  )
}

export default Pricing