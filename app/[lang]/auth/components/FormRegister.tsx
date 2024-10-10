'use client'
import React from 'react'
import Button from '@/app/components/ui/button/Button'
import ClientLocaleLink from '@/app/components/base/link/ClientLocaleLink'
import type { Dictionary } from '@/types/dictionary'

interface Props {
  translate: Dictionary['auth']
}

const FormRegister: React.FC<Props> = ({ translate }) => {
  return (
    <div className='max-w-[500px] w-full bg-[var(--secondary)] p-7 rounded-lg border border-[var(--border)]'>
      <div className='flex flex-col gap-5'>
        <div className='flex flex-col gap-3'>
          <h2 className='text-2xl font-bold'>{translate['sign_up_title']}</h2>
          <p className='secondary-text'>{translate['enter_details']}</p>
        </div>

        <form className='flex flex-col gap-4'>
          <input placeholder={translate['username']} id='name' className='input' type="text" />
          <input placeholder={translate['email']} id='email' className='input' type="text" />
          <input placeholder={translate['password']} id="password" className='input' type="password" />
          <Button className='w-full mt-5 h-[48px]'>{translate['sign_up']}</Button>
          <p>
            {translate['already_have_account']} <ClientLocaleLink className='text-[var(--blue)]' href="/auth/login">{translate['login']}</ClientLocaleLink>
          </p>
        </form>


      </div>
    </div>
  )
}

export default FormRegister