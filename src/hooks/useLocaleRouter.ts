import { useParams, useRouter } from "next/navigation";

export const useLocaleRouter = () => {
  const params = useParams<{ lang: string }>()
  const router = useRouter()
  const lang = params.lang || 'uk'

  const mutationHref = (href: string) => {
    let localizedHref = href
    if (lang === 'en' && href.startsWith('/')) {
      localizedHref = `/en${href}`
    }

    return localizedHref
  }

  const replace = (path: string) => {
    router.replace(mutationHref(path))
  }

  const push = (path: string) => {
    router.push(mutationHref(path))
  }

  return { replace, push }
}