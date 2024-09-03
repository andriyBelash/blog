import Link from 'next/link'
import { getDictionary } from './dictionaries'
import { Locale, defaultLocale } from '@/lib/i18n'

export default async function Home({ params: { lang } }: { params: { lang: Locale } }) {
  const dict = await getDictionary(lang)

  return (
    <div>
      <h1>{dict.home}</h1>
      <Link href={lang === defaultLocale ? "/en" : "/"}>
        {lang === defaultLocale ? 'Switch to English' : 'Перейти на українську'}
      </Link>
    </div>
  )
}