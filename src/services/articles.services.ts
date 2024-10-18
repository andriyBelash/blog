import { axiosWithAuth } from "../api/interceptors";

export class ArticlesService {
  public static async createArticle(data: FormData) {
    return axiosWithAuth.post('/articles/create', data, { 
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  }
}