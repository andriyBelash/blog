// app/articles/[slug]/ArticleContent.tsx
'use client'

import Image from "next/image"
import { IoMdTime } from "react-icons/io"
import { RiSeparator } from "react-icons/ri";
import { formatDate } from "@/src/lib/functions"
import type { IArticle } from "@/src/types/articles"

interface ArticleContentProps {
  article: IArticle
}

// Image component with error handling
function ArticleImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative rounded-md overflow-hidden h-[500px] w-full">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
        priority
        className="rounded-md object-cover"
      />
    </div>
  )
}

// Date component for consistent date formatting
function ArticleDate({ date, badge }: { date: string, badge?: string }) {
  return (
    <div className="flex items-center justify-center gap-2 text-gray-600 mt-8 mb-8">
      <IoMdTime size={20} aria-hidden="true" />
      <time dateTime={date}>{formatDate(date)}</time>
      <RiSeparator/>
      {badge && <div className='w-max text-[14px] text-[var(--blue)] py-2 px-4 rounded-md' style={{ backgroundColor: 'rgb(from var(--blue) R G B / .2 )'}}>{badge}</div>}
    </div>
  )
}

export default function ArticleContent({ article }: ArticleContentProps) {
  return (
    <article className="pt-12 pb-8">
      <div className="wrapper">
        <ArticleImage src={article.logo as  string} alt={article.title} />
        
        <h1 className="text-3xl font-bold mt-6 mb-2">
          {article.title}
        </h1>

        <ArticleDate date={article.created_at} badge={article.badge} />

        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ 
            __html: article.content 
          }}
        />
      </div>
    </article>
  )
}