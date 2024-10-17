import { ArticleStatus } from "./enum";

export interface IArticle {
  id: number,
  title: string,
  slug: string,
  content: string,
  status: ArticleStatus,
  logo: string | null,
  user_id: number,
  created_at: string,
  updated_at: string,
}

export interface IArticleForm {
  title: string,
  content: string,
  status: ArticleStatus,
  logo: File | null,
  slug: string,
  badge: string,
  id?: number
}