import React from 'react'
import { Locale } from '@/lib/i18n'
import { getDictionary } from '../../dictionaries'

import { FormRegister } from '../components/FormRegister'

export default async function SignUp({ params: { lang } }: { params: { lang: Locale } }) {

  const dict = await getDictionary(lang)

  return (
    <div className='wrapper auth-page'>
      <div className="auth-card">
        <h3 className="auth-card--title">{ dict['auth']['sign_up_title'] }</h3>
        <p className="auth-card--subtitle">Введіть дані для реєстрації</p>
        <FormRegister dict={dict} lang={lang}/>
      </div>
    </div>
  )
}
