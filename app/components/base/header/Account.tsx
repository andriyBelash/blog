import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Button from '../../ui/button/Button'
import ClientLocaleLink from '../link/ClientLocaleLink'

const Account: React.FC<{ login_text: string }> = ({ login_text }) => {
  return (
    <>
      { false ? 
      (<div className='flex items-center gap-[4px]'>
        <div className='h-[44px] w-[44px] border-2 rounded-md border-[var(--border)]'>
          <Image
            src="/avatar.png"
            alt="Profile"
            width={44}
            height={44}
            className="rounded-md"
          />
        </div>
          <div className='flex flex-col justify-center'>
            <span className='primary-text ellipsis'>Username</span>
            <span className='secondary-text text-sm'>email</span>
          </div>
      </div>)
       : 
       <ClientLocaleLink href="/auth/login">
          <Button>{login_text}</Button>
       </ClientLocaleLink>
      }
    </>
  )
}

export default React.memo(Account)