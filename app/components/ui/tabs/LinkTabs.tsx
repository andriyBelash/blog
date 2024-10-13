'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Props {
  tabs: { key: string, label: string }[],
  basePath: string,
}

const LinkTabs = ({ tabs, basePath }: Props) => {
  const pathname = usePathname()
  const currentKey = pathname.split('/').pop()
  return (
    <div className='flex gap-4'>
      {tabs.map((tab) => (
        <Link
          key={tab.key}
          href={`${basePath}/${tab.key}`}
          className={`  ${currentKey === tab.key ? 'text-white bg-[var(--blue)]' : 'text-secondary-text border-[var(--border)]'} cursor-pointer px-5 rounded-md border py-3 flex`}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  )
}

export default LinkTabs