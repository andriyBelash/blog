import { slugify as translitSlugify } from 'transliteration';
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const slugify = (title: string) => {
  const slug = translitSlugify(title);
  return slug
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');
};

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}



export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseQueryParams(searchParams: URLSearchParams): Record<string, any> {
  const params: Record<string, any> = {}

  searchParams.forEach((value, key) => {
    if (!isNaN(Number(value))) {
      params[key] = Number(value)
      return
    }

    if (value.toLowerCase() === 'true') {
      params[key] = true
      return
    }
    if (value.toLowerCase() === 'false') {
      params[key] = false
      return
    }

    params[key] = value
  })

  return params
}