import { create } from 'zustand'
import { fetchWrapper } from '@/app/lib/api'
import { Tokens } from '@/types/auth'

interface AuthState {
  isAuthenticated: boolean,
}

interface AuthActions {
  login: (email: string, password: string) => Promise<Tokens>
  getMe: () => Promise<void>
}

export const useAuthStore = create<AuthState & AuthActions>()((set) => ({
  isAuthenticated: false,

  async login(email: string, password: string) {
    const data = await fetchWrapper<Tokens>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    })
    return {
      access_token: data['access_token'],
      refresh_token: data['refresh_token']
    }
  },

  async getMe() {
      
  },
}))