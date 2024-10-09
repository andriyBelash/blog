
import { Locale } from '@/lib/internationalization/i18n'
import { getDictionary } from '@/lib/internationalization/dictionaries'

export default async function Home({ params: { lang } }: { params: { lang: Locale } }) {

  const dict = await getDictionary(lang)

  return (
    <div>{dict['home']}</div>
  )
}