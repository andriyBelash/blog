import React from 'react'
import FormRegister from '../components/FormRegister'
import { getDictionary } from '@/lib/internationalization/dictionaries'
import type { Locale } from '@/lib/internationalization/i18n'

const AuthSignUpPage: React.FC<{ params: { lang: Locale } }> = async ({ params: { lang } })  => {

  const translate = await getDictionary(lang)

  return (
    <div className='wrapper h-full flex items-center justify-center flex-auto'>
      <FormRegister translate={translate['auth']} />
    </div>
  )
}

export default AuthSignUpPage