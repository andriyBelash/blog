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
  getArticles: () => Promise<IArticle[]>,
}

export const useUserStore = create<States & Actions>((set, get) => ({
  user: null,
  isAuth: false,
  setUser: (user) => set({ user }),
  setIsAuth: (isAuth) => set({ isAuth }),
  globalLoader: true,
  articles: [],
  params: { page: 1, per_page: 1 },
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

  async getArticles() {
    try {
      set({ globalLoader: true })
      const res = await UserService.getArticles(get().params)
      set({ articles: res.data.data })
      return res.data
    } finally {
      set({ globalLoader: false })
    }
  },
}))