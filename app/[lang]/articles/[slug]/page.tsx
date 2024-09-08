import React from 'react'

import { Locale, localePath } from '@/lib/i18n'
import { getDictionary } from '../../dictionaries'
import { ArticleItem } from '@/app/components/ArticleItem'

import Tag from '../components/Tag'

const TEMPORARY_TAGS = [
  { name: 'etst', link: 'test' },
  { name: 'test 2', link: 'test 2' },
]

export default async function Articles({ params: { lang } }: { params: { lang: Locale } }) {
  const dict = await getDictionary(lang)

  const generateLink = (tag: string) => `${localePath('articles', lang)}/${tag}`

  return (
    <div className='articles wrapper' style={{ paddingBottom: '64px' }}>
      <div className='tags'>
        <Tag className='active' name={dict['all_tags']} link={generateLink('all')}/>
        { TEMPORARY_TAGS.map((tag) => ( <Tag key={tag.link} name={tag.name} link={generateLink(tag.link)} /> )) }
      </div>
      <div className="blog--list">
        <ArticleItem/>
        <ArticleItem/>
        <ArticleItem/>
        <ArticleItem/>
        <ArticleItem/>
        <ArticleItem/>
        <ArticleItem/>
        <ArticleItem/>
        <ArticleItem/>
        <ArticleItem/>
        <ArticleItem/>
        <ArticleItem/>
        <ArticleItem/>
        <ArticleItem/>
        <ArticleItem/>
        <ArticleItem/>
        <ArticleItem/>
        <ArticleItem/>
        <ArticleItem/>
        <ArticleItem/>
        <ArticleItem/>
        <ArticleItem/>
        <ArticleItem/>
        <ArticleItem/>
      </div>
    </div>
  )
}
