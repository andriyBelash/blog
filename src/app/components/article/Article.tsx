import React from 'react'
import type { IArticle } from '@/src/types/articles'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  article: IArticle,
  my?: boolean
}

const Article: React.FC<Props> = ({ article, my = false }) => {
  return (
    <Link href={`/articles/list/${article.slug}`} className='p-4 rounded-md border border-[var(--border)] hover:border-[var(--blue)] cursor-pointer flex flex-col gap-5'>
      <div className='relative h-[200px]'>
        <Image
          src={article.logo as string}
          alt={article.title}
          quality={100}
          fill
          objectFit='cover'
          className="rounded-md"
          style={{ minHeight: '200px', objectFit: 'cover' }}
        />
      </div>
      {article.badge && <div className='w-max text-[14px] text-[var(--blue)] py-2 px-4 rounded-md' style={{ backgroundColor: 'rgb(from var(--blue) R G B / .2 )'}}>{article.badge}</div>}
      <h2 className='font-bold text-[22px]'>{article.title}</h2>
      <div className='flex items-center justify-between'>
        <span className='secondary-text'>
          {new Date(article.created_at).toLocaleDateString('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' })}
        </span>
      </div>
    </Link>
  )
}

export default Article