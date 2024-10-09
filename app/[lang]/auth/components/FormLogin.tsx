'use client'

import Link from 'next/link'
import React, { useCallback, useState } from 'react'
import { useCookies } from 'next-client-cookies';
import { useAuthStore } from '@/stores/auth.store';

interface Props { dict: any, lang: string}

interface FormLogin { email: string, password: string}

const FormLogin: React.FC<Props> = ({ dict, lang }) => {

  const cookies = useCookies()
  const loginAction = useAuthStore(state => state.login)

  const [form, setFrom] = useState<FormLogin>({
    email: '',
    password: ''
  })
  
  const [error, setError] = useState<boolean>(false)

  const checkIsFilled = useCallback((): boolean => {
    return form.email.length > 0 && form.password.length > 6
  }, [form])

  const isFilled = checkIsFilled()

  const generateLink = (): string => {
    return lang === 'uk' ? `` : `/${lang}`
  }

 

  const submit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      setError(false)
      const tokens = await loginAction(form.email, form.password)
      cookies.set('access_token', tokens.access_token)
      cookies.set('refresh_token', tokens.refresh_token)
    } catch (error) {
      console.log(error)
      setError(true)
    }
  }


  return (
  <form className='auth-card--form'>
    <div>
      <input 
          value={form.email} 
          onChange={(e) => setFrom({...form, email: e.target.value})}
          placeholder={ dict['auth']['email'] } 
          type="email" 
          className={`${error ? 'border !border-red-600' : ''} input w-full `} 
        />
    </div>
    <div>
      <input 
        value={form.password} 
        onChange={(e) => setFrom({...form, password: e.target.value})} 
        placeholder={ dict['auth']['password'] }  
        type="password" 
        className={`${error ? 'border !border-red-600' : ''} input w-full `} 
      />
    </div>
    <p className='auth-card--form-text'>
    { dict['auth']['does_not_have_account'] } {String(error)} <Link href={`${generateLink()}/auth/signup`}>{dict['auth']['sign_up']}</Link>
    </p>
    <button onClick={(e) => submit(e)} disabled={!isFilled} className='indigo-button'>{ dict['auth']['login'] }</button>
  </form>
  )
}

export default React.memo(FormLogin);