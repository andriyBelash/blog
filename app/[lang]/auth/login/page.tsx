import React from 'react'
import Link from 'next/link'
import { Locale } from '@/lib/i18n'
import { getDictionary } from '../../dictionaries'

export default async function Login({ params: { lang } }: { params: { lang: Locale } }){
  const dict = await getDictionary(lang)
  const generateLink = (): string => {
    return `/${lang}`
  }

  return (
    <div className='wrapper auth-page'>
      <div className="auth-card">
        <h3 className="auth-card--title">{ dict['auth']['login'] }</h3>
        <p className="auth-card--subtitle">{ dict['auth']['enter_details'] }</p>
        <form className='auth-card--form'>
          <input placeholder={ dict['auth']['email'] } type="email" className='input' />
          <input placeholder={ dict['auth']['password'] }  type="password" className='input' />
          <p className='auth-card--form-text'>
          { dict['auth']['does_not_have_account'] }  <Link href={`${generateLink()}/auth/signup`}>{dict['auth']['sign_up']}</Link>
          </p>
          <button className='indigo-button'>{ dict['auth']['login'] }</button>
        </form>
      </div>
    </div>
  )
}
