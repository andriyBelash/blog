import { getDictionary } from './dictionaries'
import { Locale } from '@/lib/i18n'

export default async function Home({ params: { lang } }: { params: { lang: Locale } }) {
  const dict = await getDictionary(lang)

  return (
    <div>
    </div>
  )
}