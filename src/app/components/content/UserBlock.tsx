import Image from "next/image"
import React from "react"

interface Props {
  avatar_url: string
  username: string
}

export const UserBlock: React.FC<Props> = ({ avatar_url, username }) => {
  return (
  <div className='flex items-center gap-2'>
    <div className='w-[44px] h-[44px] rounded-full border-2 border-[var(--border)]'>
      <Image
        alt={username}
        src={avatar_url}
        width={44}
        height={44}
        quality={100}
        style={{ minHeight: '44px', minWidth: '44px', objectFit: 'cover' }}
        objectFit='cover'
        className="rounded-full"
      />
    </div>
    <span className='secondary-text hover:underline hover:text-[var(--blue)] transition'>{username}</span>
  </div>
  )
}