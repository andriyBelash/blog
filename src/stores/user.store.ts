import { create } from "zustand";
import type { IUser } from "@/src/types/user";
import UserService from "@/src/services/user.service";

type States = {
  user: IUser | null,
  isAuth: boolean,
  globalLoader: boolean
}

type Actions = {
  setUser: (user: IUser) => void
  setIsAuth: (isAuth: boolean) => void,
  getUser: (withLoading?: boolean ) => Promise<IUser>
}

export const useUserStore = create<States & Actions>((set) => ({
  user: null,
  isAuth: false,
  setUser: (user) => set({ user }),
  setIsAuth: (isAuth) => set({ isAuth }),
  globalLoader: true,
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
  }
}))