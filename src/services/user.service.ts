import { axiosWithAuth } from "@/src/api/interceptors";
import { IUser } from "@/src/types/user";

export default class UserService {
  public static async getMe() {
    return axiosWithAuth.get<IUser>('/profile/me')
  }

  public static async updateMe(fields: { username: string, email: string }) {
    return axiosWithAuth.patch<IUser>('/profile/update', fields)
  }

  public static async updateLogo(formData: FormData) {
    return axiosWithAuth.patch<IUser>('/profile/update', formData, { 
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  }

  public static async getArticles(params: Record<string, any>) {
    return axiosWithAuth.get('/profile/articles', { params })
  }
}