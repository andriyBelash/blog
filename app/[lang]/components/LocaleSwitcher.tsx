import React from 'react'
import Link from 'next/link'
import { Locale, defaultLocale } from '@/lib/i18n'

const LocaleSwitcher = ({ locale }: { locale: string }) => {
  const locales = [{ key: 'uk', label: 'UK' }, { key: 'en', label: 'EN' }]

  return (
    <div className='flex items-center gap-1'>
      { locales.map((lang, index) => (
        locale !== lang.key 
        ? <Link key={lang.key} className={`text-sm primary-text`} href={`/${lang.key}`}>{lang.label}</Link> 
        : <span key={lang.key} className={`text-sm secondary-text`}>{lang.label}</span>
      )) }
    </div>
  )
}

export default LocaleSwitcher