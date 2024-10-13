import { create } from "zustand";
import type { IUser } from "@/types/user";
import UserService from "@/services/user.service";

type States = {
  user: IUser | null,
  isAuth: boolean
}

type Actions = {
  setUser: (user: IUser) => void
  setIsAuth: (isAuth: boolean) => void,
  getUser: () => Promise<void>
}

export const useUserStore = create<States & Actions>((set) => ({
  user: null,
  isAuth: false,
  setUser: (user) => set({ user }),
  setIsAuth: (isAuth) => set({ isAuth }),
  async getUser() {
    const res = await UserService.getMe() || null;
    if (res?.data) {
      set({ user: res.data, isAuth: true });
    }
  }
}))