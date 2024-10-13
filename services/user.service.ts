import { axiosWithAuth } from "@/api/interceptors";
import { IUser } from "@/types/user";
import AuthTokenService from "./auth/auth-token.service";

export default class UserService {
  public static async getMe() {
    return axiosWithAuth.get<IUser>('/profile/me')
  }
}