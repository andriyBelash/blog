'use client'
import React from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

type ClientLocaleLinkProps = Omit<any, 'href'> & {
  href: string
  children: React.ReactNode
}

const ClientLocaleLink: React.FC<ClientLocaleLinkProps> = ({ href, children, ...rest }) => {
  const params = useParams<{ lang: string }>()
  const lang = params.lang || 'uk'
  
  let localizedHref = href
  if (lang === 'en' && href.startsWith('/')) {
    localizedHref = `/en${href}`
  }

  return (
    <Link href={localizedHref} {...rest}>
      {children}
    </Link>
  )
}

export default React.memo(ClientLocaleLink)