import { defaultLocale, isValidLocale } from '@/lib/i18n'

import Header from './components/Header'
import { ThemeProvider } from '../components/ThemeProvider'

export async function generateStaticParams() {
  return [{ lang: defaultLocale }, { lang: 'en' }]
}

export default function LocaleLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  const locale = isValidLocale(lang) ? lang : defaultLocale
  return (
    <ThemeProvider>
      <Header locale={lang}/>
      {children}
    </ThemeProvider>
  )
}