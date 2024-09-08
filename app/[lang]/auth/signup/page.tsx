import React from 'react'
import Link from 'next/link'
import { Locale } from '@/lib/i18n'
import { getDictionary } from '../../dictionaries'

export default async function SignUp({ params: { lang } }: { params: { lang: Locale } }) {

  const generateLink = (): string => {
    return `/${lang}`
  }

  const dict = await getDictionary(lang)

  return (
    <div className='wrapper auth-page'>
      <div className="auth-card">
        <h3 className="auth-card--title">{ dict['auth']['sign_up_title'] }</h3>
        <p className="auth-card--subtitle">Введіть дані для реєстрації</p>
        <form className='auth-card--form'>
          <input placeholder={ dict['auth']['username'] } type="text" className='input' />
          <input placeholder={ dict['auth']['email'] } type="email" className='input' />
          <input placeholder={ dict['auth']['password'] } type='password' className='input' />
          <p className='auth-card--form-text'>
            { dict['auth']['already_have_account'] } <Link href={`${generateLink()}/auth/login`}>{ dict['auth']['login'] }</Link>
          </p>
          <button className='indigo-button'>{ dict['auth']['sign_up'] }</button>
        </form>
      </div>
    </div>
  )
}
