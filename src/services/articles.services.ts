import { axiosWithAuth, axiosClassic } from "../api/interceptors";
import type { IArticle } from "../types/articles";

export class ArticlesService {
  public static async createArticle(data: FormData) {
    return axiosWithAuth.post('/articles/create', data, { 
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  }

 public static getCurrentArticles(slug: string) {
    return axiosWithAuth.get<IArticle>('/articles/' + slug)
  }
}