'use client'
import React from 'react'
import LocaleSwitcher from './LocaleSwitcher'
import ThemeSwitcher from './ThemeSwithcer'
import AuthBlock from './AuthBlock'
import Link from 'next/link'
import Image from 'next/image'


interface Props {
  locale: string,
  auth_button_text: string
}


const Header: React.FC<Props> = ({ locale, auth_button_text }) => {

  const generateLink = (lang: string): string => {
    return lang === 'uk' ? `` : `/${lang}`
  }
  
  return (
    <header className='flex items-center justify-between wrapper py-4'>
      <Link href={locale === 'uk' ? `/` : `/${locale}`} className='font-bold text-xl'>BLOG</Link>
      <div className='flex items-center gap-4 h-[32px]'>
        {
          true ?  
            <AuthBlock 
            link={`${generateLink(locale)}/auth/login`}
            title={auth_button_text}
          /> : <div className='flex items-center gap-2'>
            <Image 
              src={'/placeholder.png'}
              style={{ borderRadius: '50%', height: 32, width: 32, objectFit: 'cover' }}
              alt="user" 
              width={28} 
              height={28} 
              priority
            />
            <span className='primary-text'>User</span>
          </div>
        }
        <LocaleSwitcher locale={locale}/>
        <ThemeSwitcher/>
      </div>
    </header>
  )
}

export default Header