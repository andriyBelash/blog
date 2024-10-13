'use client'
import { useUserStore } from '@/src/stores/user.store'
import { useRouter } from 'next/navigation'
import AuthService from '@/src/services/auth/auth.service'

import SkeletonLoader from '@/app/components/ui/SkeletonLoader'
import React, { useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/app/components/ui/button/Button'
import { CiEdit } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";

const InfoBlock = () => {

 const user = useUserStore((state) => state.user)
 const globalLoader = useUserStore((state) => state.globalLoader)

 const router = useRouter()

 const Skeleton: React.FC = () => {
  return (
   <div className='grid grid-cols-[100px_4fr] gap-5'>
     <SkeletonLoader height='100px' borderRadius='50%' />
     <SkeletonLoader height='100px' />
   </div>
  )
 }

 const logout = async () => {
  await AuthService.logout()
  useUserStore.setState({ isAuth: false, user: null })
  router.replace('/')
 }

  return (
    <div>
      {
        globalLoader ? <Skeleton /> : 
        (
          <div className='flex items-end justify-between'>
            <div className='flex items-center gap-4'>
              <div className='h-[100px] w-[100px]'>
                <Image
                  src={user?.avatar_url || '/placeholder.png'}
                  width={100}
                  height={100}
                  alt='avatar'
                  className='rounded-md'
                  style={{ objectFit: 'cover', height: '100px' }}
                />
              </div>
              <div className='flex flex-col gap-4'>
                <h1 className='text-3xl font-bold'>{user?.username}</h1>
                <p className='text-xl secondary-text font-medium'>{user?.email}</p>
              </div>
            </div>
            <div className='flex gap-4'>
              <Link href='settings'>
                <Button type='outline'>
                  <CiEdit size={30}/>
                </Button>
              </Link>
              <Button onClick={logout} type='outline'>
                <CiLogout size={30}/>
              </Button>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default React.memo(InfoBlock)