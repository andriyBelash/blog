import React from 'react'
import Link, { LinkProps } from 'next/link'

type ServerLocaleLinkProps = Omit<LinkProps, 'href'> & {
  href: string
  children: React.ReactNode
  lang: string 
}

const ServerLocaleLink: React.FC<ServerLocaleLinkProps> = ({ href, children, lang, ...rest }) => {
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

export default ServerLocaleLink