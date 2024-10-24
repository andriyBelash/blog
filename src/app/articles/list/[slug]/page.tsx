import { ArticlesService } from "@/src/services/articles.services"
import { notFound } from 'next/navigation'
import ArticleContent from "@/src/app/components/article/ArticleContent";
import type { IArticle } from "@/src/types/articles";
import type { Metadata } from "next";

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const response = await ArticlesService.getCurrentArticles(params.slug)
    const article = response?.data as IArticle

    if (!article) {
      return {
        title: 'Article Not Found',
      }
    }

    return {
      title: article.title,
      description: article.content || article.content.slice(0, 160),
      openGraph: {
        title: article.title,
        images: [article.logo],
      },
    }
  } catch (error) {
    return {
      title: 'Article Not Found',
    }
  }
}


export default async function ArticlePage({ params }: PageProps) {
  try {
    const response = await ArticlesService.getCurrentArticles(params.slug)
    const article = response?.data

    if (!article) {
      return notFound()
    }

    return <ArticleContent article={article} />
  } catch (error) {
    console.error('Error fetching article:', error)
    return notFound()
  }
}