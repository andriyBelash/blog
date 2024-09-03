import 'server-only'
import { Locale } from '@/lib/i18n'
import { Dictionary } from '@/types/dictionary'

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  uk: () => import('@/dictionaries/uk.json').then((module) => module.default),
}

export const getDictionary = async (locale: Locale): Promise<Dictionary> => dictionaries[locale]()