
import Link from 'next/link'
import { localePath } from '@/lib/i18n'
import { getDictionary } from './dictionaries'
import { Locale } from '@/lib/i18n'
import { ArticleItem } from '../components/ArticleItem'

export default async function Home({ params: { lang } }: { params: { lang: Locale } }) {
  const dict = await getDictionary(lang)

  return (
    <div className='wrapper page'>
      <header className='page-header'>
        { dict['main_title'] }
      </header>
        <div className='blog--container'>
          <div className='blog--container-header'>
            <p>{ dict['latest_articles'] }</p>
            <Link href={`${localePath('articles', lang)}/all`}>{ dict['show_more'] }</Link>
          </div>
          <div className="blog--list">
            <ArticleItem/>
            <ArticleItem/>
            <ArticleItem/>
            <ArticleItem/>
            <ArticleItem/>
            <ArticleItem/>
          </div>
        </div>
    </div>
  )
}