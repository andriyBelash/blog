import { create } from "zustand";
import { ArticleStatus } from "../types/enum";
import { IArticleForm } from "../types/articles";
import { ArticlesService } from "../services/articles.services";


type States = {
  form: IArticleForm,
  loading: boolean
}

type Actions = {
  setFieldInForm: (field: keyof IArticleForm, value: IArticleForm[keyof IArticleForm]) => void,
  create: () => Promise<void>
}


export const useArticlesStore = create<States & Actions>((set, get) => ({
  form: {
    title: '',
    content: '',
    status: ArticleStatus.PUBLISHED,
    logo: null,
    slug: '',
    badge: '',
  },

  loading: false,


  setFieldInForm: (field, value) => {
    set((state) => ({...state, form: { ...state.form, [field]: value} }))
  },

  create: async () => {
    try {
      
      const form = get().form
      const formData = new FormData()

     if(typeof form.logo !== 'string') formData.append('logo', form.logo as File)
      formData.append('title', form.title)
      formData.append('content', form.content)
      formData.append('status', form.status)
      formData.append('badge', form.badge)
      formData.append('slug', form.slug)
      
      set({ loading: true })
      await ArticlesService.createArticle(formData)
    } finally {
      set({ loading: false })
    }
  }

}))