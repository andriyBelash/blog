"use client"
import React from 'react'
import Image from 'next/image'
import Button from '../../ui/button/Button'
import { useUserStore } from '@/src/stores/user.store'
import Link from 'next/link'

const Account = () => {
  const store = useUserStore();
  return (
    <>
      { useUserStore.getState().user ? 
      (<Link href="/profile/me/overview" className='flex items-center gap-[8px]'>
        <div className='h-[44px] w-[44px] border-2 rounded-md border-[var(--border)]'>
          <Image
            alt="Profile"
            src={store.user?.avatar_url || "/avatar.png"}
            width={44}
            height={44}
            quality={100}
            objectFit='cover'
            className="rounded-md"
            style={{ minHeight: '44px', minWidth: '44px', objectFit: 'cover' }}
          />
        </div>
        <div className='flex flex-col justify-center'>
          <span className='primary-text ellipsis'>{useUserStore.getState().user?.username}</span>
          <span className='secondary-text text-sm'>{useUserStore.getState().user?.email}</span>
        </div>
      </Link>)
       : 
       <Link href="/auth/login">
          <Button>Увійти</Button>
       </Link>
      }
    </>
  )
}

export default React.memo(Account)