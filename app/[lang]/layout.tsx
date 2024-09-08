import { defaultLocale, isValidLocale, Locale } from '@/lib/i18n'

import Header from './components/Header'
import { ThemeProvider } from '../components/ThemeProvider'
import { getDictionary } from './dictionaries'

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
    <ThemeProvider>
      <Header locale={lang} auth_button_text={dict['auth']['login']}/>
      {children}
    </ThemeProvider>
  )
}