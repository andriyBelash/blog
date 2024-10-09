import React from 'react'
import { Locale } from '@/lib/i18n'
import { getDictionary } from '../../dictionaries'
import FormLogin from '../components/FormLogin'

export default async function Login({ params: { lang } }: { params: { lang: Locale } }){
  const dict = await getDictionary(lang)

  return (
    <div className='wrapper auth-page'>
      <div className="auth-card">
        <h3 className="auth-card--title">{ dict['auth']['login'] }</h3>
        <p className="auth-card--subtitle">{ dict['auth']['enter_details'] }</p>
        <FormLogin dict={dict} lang={lang} />
      </div>
    </div>
  )
}
