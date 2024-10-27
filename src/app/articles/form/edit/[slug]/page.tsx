'use client'
import FormCard from "../../../components/form/FormCard"
import ImageUploader from "../../../components/form/ImageUploader"
import SingleSelect from "@/src/app/components/ui/select/SingleSelect"
import FormEditor from "../../../components/form/FormEditor"
import Button from "@/src/app/components/ui/button/Button"

import { usePathname } from "next/navigation"
import { useArticlesStore } from "@/src/stores/articles.store"
import { ARTICLES_STATUS } from "@/src/lib/constants"
import { useShallow } from "zustand/react/shallow"
import { useEffect } from "react"
import { slugify } from "@/src/lib/functions"
import { useRouter } from "next/navigation"
import { Toaster, toast } from 'sonner'

export default function ArticlesFormEdit() {

  const pathname = usePathname()
  const router = useRouter()

  const { form, article, setFieldInForm, getCurrentArticle } = useArticlesStore(useShallow((state) => ({
    form: state.form,
    article: state.article,
    setFieldInForm: state.setFieldInForm,
    getCurrentArticle: state.getCurrentArticle
  })))

  useEffect(() => {
    setFieldInForm('slug', slugify(form.title))
  }, [form.title, setFieldInForm])

  useEffect(() => {
    const slug = pathname.split('/').pop() as string
    getCurrentArticle(slug)
  }, [pathname, getCurrentArticle])

  const checkValidation = (): boolean => {
    if (!form.logo && !article?.logo) {
      toast.error('Додайте зображення')
      return false
    }

    const fields = Object.values(form).filter((field) => field !== null)

    console.log(fields, form)

    if (fields.some((field) => !field)) {
      toast.error('Заповніть всі поля')
      return false
    }

    return true
  }

  const update = async () => {
    const isValid = checkValidation()

    if(isValid) {
      try {
        await useArticlesStore.getState().create()
        router.push('/profile/me/articles')
      } catch (error) {
        toast.error('Помилка при створенні статті')
      }
    }
  }


  if(!article) {
    return null
  }

  return (
    <div className="wrapper">
      <div className="pt-16 pb-8">
        <Toaster/>
        <div className="grid gap-4 grid-cols-[1.5fr_1fr]">
          <div className="flex flex-col gap-4">
            <FormCard title="Зображення" subtitle="Вставте зображення для вашої статті">
              <ImageUploader demo={article.logo} setImage={(file) => setFieldInForm('logo', file)} />
            </FormCard>
            <FormCard title="Заголовок" subtitle="Введіть заголовок для вашої статті">
              <input value={form.title} onChange={(e) => setFieldInForm('title', e.target.value)} type="text" placeholder="Введіть заголовок" className="input" />
            </FormCard>
            <FormCard title="Текст" subtitle="Введіть текст для вашої статті">
              <FormEditor value={form.content} onChange={(value) => setFieldInForm('content', value)} />
            </FormCard>
          </div>
          <div className="flex flex-col gap-4">
            <FormCard title="Тег" subtitle="Введіть тег для вашої статті">
              <input value={form.badge} onChange={(e) => setFieldInForm('badge', e.target.value)} type="text" placeholder="Введіть тег" className="input" />
            </FormCard>
            <FormCard title="Slug" subtitle="Cлаг вашої статті, він змінюється автоматично після оновлення заголовку">
              <input readOnly value={form.slug} onChange={(e) => setFieldInForm('slug', e.target.value)} type="text" placeholder="Введіть значення" className="input" />
            </FormCard>
            <FormCard title="Статус" subtitle="Виберіть статус для вашої статті">
              <SingleSelect
                options={ARTICLES_STATUS}
                selected={form.status}
                onChange={(value) => setFieldInForm('status', value)}
                placeholder="Виберіть статус"
              />
            </FormCard>
          </div>
        </div>
        <Button onClick={update} className="mt-6">Редагувати</Button>
      </div>
    </div>
  )
}