import { axiosClassic } from '@/api/interceptors'
import type { LoginFormFields, SignupFormFields, IAuthResponse, Tokens } from '@/types/auth';
import AuthTokenService from './auth-token.service';

export default class AuthService {
  public static async main(type: 'login' | 'register', data: LoginFormFields | SignupFormFields) {
    const response  = await axiosClassic.post<IAuthResponse>(`/auth/${type}`, data)
    if (response && response.data) {
      AuthTokenService.setAccessToken(response.data.access_token)
    }

    return response
  }

  public static async refreshToken() {
    const response = await axiosClassic.post<Tokens>('/auth/refresh', {}, {
      withCredentials: true
    })

    if (response && response.data) {
      AuthTokenService.setAccessToken(response.data.access_token)
    }
  }

  public static async logout() {
    await axiosClassic.post('/auth/logout')
    AuthTokenService.removeFromStorage()
  }
}