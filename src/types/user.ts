import { UserRole } from './enum'

export interface IUser {
  id: number
  username: string
  email: string
  role: UserRole,
  avatar_url: string
  created_at: string
  updated_at: string
}