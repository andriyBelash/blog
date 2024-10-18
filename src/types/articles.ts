import { ArticleStatus } from "./enum";
import { IUser } from "./user";

export interface IArticle {
  id: number,
  title: string,
  slug: string,
  content: string,
  status: ArticleStatus,
  badge: string,
  logo: string | null,
  user_id: number,
  created_at: string,
  updated_at: string,
  user: IUser
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