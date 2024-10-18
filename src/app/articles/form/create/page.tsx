'use client'
import { useEffect } from "react"
import FormCard from "../../components/form/FormCard"
import ImageUploader from "../../components/form/ImageUploader"
import SingleSelect from "@/src/app/components/ui/select/SingleSelect"
import FormEditor from "../../components/form/FormEditor"
import { ARTICLES_STATUS } from "@/src/lib/constants"
import { slugify } from "@/src/lib/functions"
import { useArticlesStore } from "@/src/stores/articles.store"
import { useShallow } from 'zustand/react/shallow'
import { Toaster, toast } from 'sonner'
import { useRouter } from "next/navigation"
import Button from "@/src/app/components/ui/button/Button"
export default function ArticlesFormCreate() {

  const router = useRouter()

  const { form, setFieldInForm } = useArticlesStore(useShallow((state) => ({
    form: state.form,
    setFieldInForm: state.setFieldInForm
  })))

  useEffect(() => {
    setFieldInForm('slug', slugify(form.title))
  }, [form.title])

  const checkValidation = (): boolean => {
    if (!form.logo) {
      toast.error('Додайте зображення')
      return false
    }

    const fields = Object.values(form)

    if (fields.some((field) => !field)) {
      toast.error('Заповніть всі поля')
      return false
    }

    return true
  }

  const create = async () => {
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

  return (
    <div className="wrapper">
      <Toaster richColors />
      <div className="pt-16 pb-8">
        <div className="grid gap-4 grid-cols-[1.5fr_1fr]">
          <div className="flex flex-col gap-4">
            <FormCard title="Зображення" subtitle="Вставте зображення для вашої статті">
              <ImageUploader setImage={(file) => setFieldInForm('logo', file)}/>
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
        <Button onClick={create} className="mt-6">Створити</Button>
      </div>
    </div>
  )
}