'use client'
import React from 'react'
import Link from 'next/link'

import { usePathname } from 'next/navigation'

const LocaleSwitcher = ({ locale }: { locale: string }) => {
  const locales = [{ key: 'uk', label: 'UK' }, { key: 'en', label: 'EN' }]

  const pathname = usePathname()

  const generateLink = (lang: string): string => {
    const path = pathname.split('/').filter((_, i) => i > 1).join('/')
    return lang === 'uk' ? `/${path}` : `/${lang}/${path}`
  }

  return (
    <div className='flex items-center gap-1'>
      { locales.map((lang, index) => (
        locale !== lang.key 
        ? <Link key={lang.key} className={`text-sm primary-text`} href={generateLink(lang.key)}>{lang.label}</Link> 
        : <span key={lang.key} className={`text-sm secondary-text`}>{lang.label}</span>
      )) }
    </div>
  )
}

export default LocaleSwitcher