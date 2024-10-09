import { fetchWrapper } from "../api";

export class AuthService {
  public async login(email: string, password: string) {
    return fetchWrapper('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    })
  }
}