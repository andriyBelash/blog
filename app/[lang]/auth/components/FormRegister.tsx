'use client'

import Link from 'next/link'
import React from 'react'

interface Props {
  dict: any,
  lang: string
}

export const FormRegister: React.FC<Props> = ({ dict, lang }) => {
  const generateLink = (): string => {
    return lang === 'uk' ? `` : `/${lang}`
  }
  return (
    <form className='auth-card--form'>
    <input placeholder={ dict['auth']['username'] } type="text" className='input' />
    <input placeholder={ dict['auth']['email'] } type="email" className='input' />
    <input placeholder={ dict['auth']['password'] } type='password' className='input' />
    <p className='auth-card--form-text'>
      { dict['auth']['already_have_account'] } <Link href={`${generateLink()}/auth/login`}>{ dict['auth']['login'] }</Link>
    </p>
    <button className='indigo-button'>{ dict['auth']['sign_up'] }</button>
  </form>
  )
}