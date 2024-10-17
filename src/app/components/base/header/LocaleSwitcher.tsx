'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { generateSwitcherLink } from '@/lib/internationalization/i18n'

import type { Locale } from '@/lib/internationalization/i18n'
import Link from 'next/link'
const LocaleSwitcher: React.FC<{ locale: Locale }> = ({ locale }) => {

  const pathname = usePathname()

  return (
    <Link href={generateSwitcherLink(locale, pathname)} className={`flex items-center justify-center cursor-pointer thumb-wrapper`}>
      <span className='primary-text'>
        { locale === 'en' ? 'EN' : 'УКР' }
      </span>
    </Link>
  )
}

export default React.memo(LocaleSwitcher) // Memoize the LocaleSwitcher