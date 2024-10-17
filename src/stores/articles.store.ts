import { create } from "zustand";
import { ArticleStatus } from "../types/enum";
import { IArticleForm } from "../types/articles";


type States = {
  form: IArticleForm
}

type Actions = {
  setFieldInForm: (field: keyof IArticleForm, value: IArticleForm[keyof IArticleForm]) => void
}


export const useArticlesStore = create<States & Actions>((set) => ({
  form: {
    title: '',
    content: '',
    status: ArticleStatus.PUBLISHED,
    logo: null,
    slug: '',
    badge: '',
  },


  setFieldInForm: (field, value) => {
    set((state) => ({...state, form: { ...state.form, [field]: value} }))
  }

}))