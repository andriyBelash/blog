import { create } from "zustand";
import UserService from "@/src/services/user.service";
import { IArticle } from "../types/articles";
import type { IUser } from "@/src/types/user";
import { get } from "http";

type States = {
  user: IUser | null,
  isAuth: boolean,
  globalLoader: boolean,
  articles: IArticle[],
  params: Record<string, any>
}

type Actions = {
  setUser: (user: IUser) => void
  setIsAuth: (isAuth: boolean) => void,
  getUser: (withLoading?: boolean ) => Promise<IUser>,
  updateUser: (fields: {username: string, email: string}) => Promise<IUser | undefined>,
  updateLogo: (formData: FormData) => Promise<IUser | undefined>,
  getArticles: (query?: Record<string, any>) => Promise<IArticle[]>,
}

export const useUserStore = create<States & Actions>((set, get) => ({
  user: null,
  isAuth: false,
  setUser: (user) => set({ user }),
  setIsAuth: (isAuth) => set({ isAuth }),
  globalLoader: true,
  articles: [],
  params: { page: 1, per_page: 6 },
  async getUser(withLoading = true) {
    try {

      if (withLoading) set({ globalLoader: true });

      const res = await UserService.getMe() || null;
      if (res?.data) {
        set({ user: res.data, isAuth: true });
      }
      return res.data
    } finally {
      if (withLoading) set({ globalLoader: false });
    }
  },

  async updateUser(fields) {
    try {
      const res = await UserService.updateMe(fields)
      if (res?.data) {
        set({ user: res.data })
      }
      return res.data
    } catch (error) {}
  },

  async updateLogo(formData) {
    try {
      const res = await UserService.updateLogo(formData)
      if (res?.data) {
        set({ user: res.data })
      }
      return res.data
    } catch (error) {}
  },

  async getArticles(query) {
    try {
      const searchParams = {...get().params, ...query}
      set({ globalLoader: true })
      const res = await UserService.getArticles(searchParams)
      set({ articles: res.data.data })
      set(state => ({ params: { ...state.params, total: res.data.meta.total } }))
      return res.data
    } finally {
      set({ globalLoader: false })
    }
  },
}))