import Link from 'next/link'
import React from 'react'

interface Props {
  link: string,
  title: string
}

const AuthBlock: React.FC<Props> = ({ link, title }) => {
  return (
    <Link href={link} className='indigo-button' style={{ padding: '6px 12px' }}>
      {title}
    </Link>
  )
}

export default AuthBlock