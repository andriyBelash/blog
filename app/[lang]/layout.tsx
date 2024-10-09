import { defaultLocale, isValidLocale, Locale } from '@/lib/internationalization/i18n'

import { getDictionary } from '../../lib/internationalization/dictionaries'

import Header from '../components/base/header/Header'
import Footer from '../components/base/Footer'

export async function generateStaticParams() {
  return [{ lang: defaultLocale }, { lang: 'en' }]
}

export default async function LocaleLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode
  params: { lang: Locale }
}) {
  const locale = isValidLocale(lang) ? lang : defaultLocale
  const dict = await getDictionary(lang)
  return (
    <div id="root">
      <Header/>
      <main>
        {children}
      </main>
      <Footer/>
    </div>
  )
}