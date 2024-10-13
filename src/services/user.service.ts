import { axiosWithAuth } from "@/src/api/interceptors";
import { IUser } from "@/src/types/user";
import AuthTokenService from "./auth/auth-token.service";

export default class UserService {
  public static async getMe() {
    return axiosWithAuth.get<IUser>('/profile/me')
  }
}