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
  const dict = await getDictionary(lang)
  return (
    <div id="root">
      <Header locale={lang} login_text={dict['auth']['login']}/>
      <main className="flex flex-col">
        {children}
      </main>
      <Footer/>
    </div>
  )
}