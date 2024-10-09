export const locales = ['uk', 'en'] as const
export type Locale = typeof locales[number]

export const defaultLocale: Locale = 'uk'

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale)
}

export function localePath(lang: string,path: string): string {
  return lang === 'uk' ? `${path}` : `${lang}/${path}`
}

export function generateSwitcherLink(currentLang: Locale, pathname: string): string {
  const segments = pathname.split('/').filter(segment => segment);
  const hasLangPrefix = segments[0] === 'en';
  
  if (hasLangPrefix) {
    return '/' + segments.slice(1).join('/');
  } else {
    return '/en' + pathname;
  }
}