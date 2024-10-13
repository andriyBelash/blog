import type { IUser } from "./user";

export interface Tokens {
  access_token: string
  refresh_token: string
}

export interface LoginFormFields {
  email: string
  password: string
}

export interface SignupFormFields extends LoginFormFields {
  username: string
}

export interface IAuthResponse extends Tokens {
  user: IUser
}