'use client'
import React from 'react'
import LocaleSwitcher from './LocaleSwitcher'
import ThemeSwitcher from './ThemeSwithcer'
import AuthBlock from './AuthBlock'
import Link from 'next/link'

interface Props {
  locale: string,
  auth_button_text: string
}


const Header: React.FC<Props> = ({ locale, auth_button_text }) => {

  const generateLink = (lang: string): string => {
    return `/${lang}`
  }
  
  return (
    <header className='flex items-center justify-between wrapper py-4'>
      <Link href={generateLink(locale)} className='font-bold text-xl'>BLOG</Link>
      <div className='flex items-center gap-4'>
        <AuthBlock 
          link={`${generateLink(locale)}/auth/login`}
          title={auth_button_text}
        />
        <LocaleSwitcher locale={locale}/>
        <ThemeSwitcher/>
      </div>
    </header>
  )
}

export default Header