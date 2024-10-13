import React from 'react'
import FormRegister from '../components/FormRegister'
import { getDictionary } from '@/lib/internationalization/dictionaries'
import type { Locale } from '@/lib/internationalization/i18n'

const AuthSignUpPage = async ()  => {

  return (
    <div className='wrapper h-full flex items-center justify-center flex-auto'>
      <FormRegister />
    </div>
  )
}

export default AuthSignUpPage