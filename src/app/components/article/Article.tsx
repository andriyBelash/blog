import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { UserBlock } from '../content/UserBlock'
import { CiEdit } from "react-icons/ci";
import { FaRegTrashCan } from "react-icons/fa6";

import type { IArticle } from '@/src/types/articles'

interface Props {
  article: IArticle,
  my?: boolean,
  onEdit?: (slug: string) => void,
  onDelete?: (id: number) => void
}

const Article: React.FC<Props> = ({ article, my = false, onEdit, onDelete }) => {
  return (
    <div className='p-4 rounded-md border border-[var(--border)] cursor-pointer flex flex-col gap-5'>
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
      <div className='flex items-center justify-between gap-2'>
        <Link href={`#`}>
          <UserBlock avatar_url={article.user?.avatar_url} username={article.user?.username} />
        </Link>
        {article.badge && <div className='w-max text-[14px] text-[var(--blue)] py-2 px-4 rounded-md' style={{ backgroundColor: 'rgb(from var(--blue) R G B / .2 )'}}>{article.badge}</div>}
      </div>
      <Link href={`/articles/list/${article.slug}`} className='font-bold text-[22px] hover:text-[var(--blue)]'>{article.title}</Link>
      <div className='flex items-center justify-between'>
        <span className='secondary-text'>
          {new Date(article.created_at).toLocaleDateString('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' })}
        </span>
      </div>
      { my && (
        <div className='flex justify-end items-center gap-2'>
         { onEdit && <button 
            arial-label='Редагувати' 
            title='Редагувати' 
            className='w-[32px] h-[32px] flex items-center justify-center rounded bg-green-100 hover:bg-green-200 active:bg-green-300 transition'
            onClick={() => onEdit(article.slug)}
          >
            <CiEdit color='green' size={24} />
          </button> }
          {onDelete && <button 
            arial-label='Видалити' 
            title='Видалити' 
            className='w-[32px] h-[32px] flex items-center justify-center rounded bg-red-100 hover:bg-red-200 active:bg-red-300 transition'
            onClick={() => onDelete(article.id)}
          >
            <FaRegTrashCan color='red' size={16} />
          </button>}
        </div>
      ) }
    </div>
  )
}

export default Article