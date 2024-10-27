import { create } from "zustand";
import { ArticleStatus } from "../types/enum";
import { ArticlesService } from "../services/articles.services";
import { useUserStore } from "./user.store";

import type { IArticle, IArticleForm } from "../types/articles";

type States = {
  form: IArticleForm,
  loading: boolean,
  article: IArticle | null
}

type Actions = {
  setFieldInForm: (field: keyof IArticleForm, value: IArticleForm[keyof IArticleForm]) => void,
  getCurrentArticle: (slug: string) => Promise<IArticle>,
  create: () => Promise<void>,
  deleteArticle: (id: number) => Promise<void>,
}


export const useArticlesStore = create<States & Actions>((set, get) => ({
  form: {
    title: '',
    content: '',
    status: ArticleStatus.PUBLISHED,
    logo: null,
    slug: '',
    badge: '',
    id: 0
  },

  loading: false,

  article: null,


  setFieldInForm: (field, value) => {
    set((state) => ({...state, form: { ...state.form, [field]: value} }))
  },

  create: async () => {
    try {
      
      const form = get().form
      const formData = new FormData()

     if(typeof form.logo !== 'string' && form.logo) formData.append('logo', form.logo as File)
      formData.append('title', form.title)
      formData.append('content', form.content)
      formData.append('status', form.status)
      formData.append('badge', form.badge)
      formData.append('slug', form.slug)
      
      set({ loading: true })
      if(form.id) {
        await ArticlesService.updateArticle(form.id, formData)
      } else {
        await ArticlesService.createArticle(formData)
      }
    } finally {
      set({ loading: false })
    }
  },

  getCurrentArticle: async (slug) => {
    try {
      const res = await ArticlesService.getCurrentArticles(slug)
      const keys = ['title', 'content', 'status', 'slug', 'badge', 'id']
      keys.forEach(key => set({ form: { ...get().form, [key]: res.data[key as keyof typeof res.data] } }))
      set({ article: res.data })
      return res.data
    } finally {
      set({ loading: false })
    }
  },

  deleteArticle: async (id) => {
    try {
      await ArticlesService.deleteArticle(id)
      await useUserStore.getState().getArticles()
    } finally {
      set({ loading: false })
    }
  }

}))