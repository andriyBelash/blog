'use client'
import React from 'react'
import Button from '@/app/components/ui/button/Button'
import ClientLocaleLink from '@/app/components/base/link/ClientLocaleLink'
import type { Dictionary } from '@/types/dictionary'

interface Props {
  translate: Dictionary['auth']
}

const FormLogin: React.FC<Props> = ({ translate }) => {
  return (
    <div className='max-w-[500px] w-full bg-[var(--secondary)] p-7 rounded-lg border border-[var(--border)]'>
      <div className='flex flex-col gap-5'>
        <div className='flex flex-col gap-3'>
          <h2 className='text-2xl font-bold'>{translate['login_title']}</h2>
          <p className='secondary-text'>{translate['enter_details']}</p>
        </div>

        <form className='flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <input placeholder={translate['email']} id='email' className='input' type="text" />
          </div>
          <div className='flex flex-col gap-2'>
            <input placeholder={translate['password']} id="password" className='input' type="password" />
          </div>
          <Button className='w-full mt-5 h-[48px]'>{translate['login']}</Button>
          <p>
            {translate['does_not_have_account']} <ClientLocaleLink className='text-[var(--blue)]' href="/auth/signup">{translate['sign_up']}</ClientLocaleLink>
          </p>
        </form>


      </div>
    </div>
  )
}

export default FormLogin