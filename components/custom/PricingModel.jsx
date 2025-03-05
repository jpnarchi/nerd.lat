import Lookup from '@/data/Lookup'
import React, { useContext, useState } from 'react'
import { Button } from '../ui/button'
import { UserDetailContext } from '@/context/UserDetailContext'
import axios from 'axios'

function PricingModel() {
    const {userDetail,setUserDetail}=useContext(UserDetailContext);
    const [isLoading, setIsLoading] = useState(false)

    const handlePayment = async (pricing) => {
        if (!userDetail) {
            alert(Lookup.UNAUTHORIZED_TEXT)
            return 
        }

        setIsLoading(true)

        try {
            const response = await axios.post('/api/stripe', {
                price: pricing.price,
                newTokens: pricing.value,
                currentTokens: userDetail?.token,
                userId: userDetail?._id,
                email: userDetail?.email
            });

            if (response.data.sessionUrl) {
                window.location.href = response.data.sessionUrl; 
            } else {
                console.error(Lookup.FAILED_TO_INITIATE_STRIPE_CHECKOUT, response.data);
            } 
        } catch (error) {
            console.log('Error', error)
        } finally {
            setIsLoading(false)
        }
    }

  return (
    <div className='mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 
    xl:grid-cols-4 gap-5'>
        {Lookup.PRICING_OPTIONS.map((pricing,index)=>(
            <div key={index} className='border p-7 rounded-xl flex flex-col gap-3' 
           >
                <h2 className='font-bold text-2xl'>{pricing.name}</h2>
                <h2 className='font-medium text-lg'>{pricing.tokens} Tokens</h2>
                <p className='text-gray-400'>{pricing.desc}</p>
                
                <h2 className='font-bold text-3xl text-center mt-6'>${pricing.price} MXN</h2>

                <Button onClick={() => handlePayment(pricing)}>Comprar {pricing.name}</Button>
            </div>
        ))}
    </div>
  )
}

export default PricingModel