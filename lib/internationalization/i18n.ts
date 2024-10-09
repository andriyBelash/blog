export const locales = ['uk', 'en'] as const
export type Locale = typeof locales[number]

export const defaultLocale: Locale = 'uk'

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale)
}

export function localePath(path: string, lang: string): string {
  return lang === 'uk' ? `/${path}` : `/${lang}/${path}`
}