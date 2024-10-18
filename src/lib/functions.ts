import { slugify as translitSlugify } from 'transliteration';

export const slugify = (title: string) => {
  const slug = translitSlugify(title);
  return slug
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');
};