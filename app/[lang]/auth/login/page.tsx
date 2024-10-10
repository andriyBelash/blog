import React from 'react'
import FormLogin from '../components/FormLogin'
import { getDictionary } from '@/lib/internationalization/dictionaries'
import type { Locale } from '@/lib/internationalization/i18n'

const AuthLoginPage: React.FC<{ params: { lang: Locale } }> = async ({ params: { lang } }) => {

  const translate = await getDictionary(lang)

  return (
    <div className='wrapper h-full flex items-center justify-center flex-auto'>
      <FormLogin translate={translate['auth']} />
    </div>
  )
}

export default AuthLoginPage