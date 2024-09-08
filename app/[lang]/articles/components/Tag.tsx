import Link from 'next/link'
import React from 'react'

interface Props {
  name: string,
  link: string,
  className?: string
}

const Tag: React.FC<Props> = ({ name, link, className }) => {
  return (
    <Link href={link} className={`tag ${className}`}>{name}</Link>
  )
}

export default Tag