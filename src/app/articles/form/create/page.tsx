'use client'
import FormCard from "../../components/form/FormCard"
import ImageUploader from "../../components/form/ImageUploader"
import SingleSelect from "@/src/app/components/ui/select/SingleSelect"
import FormEditor from "../../components/form/FormEditor"
import { ARTICLES_STATUS } from "@/src/lib/constants"

import { useArticlesStore } from "@/src/stores/articles.store"
import { useShallow } from 'zustand/react/shallow'
export default function ArticlesFormCreate() {

  const { form, setFieldInForm } = useArticlesStore(useShallow((state) => ({
    form: state.form,
    setFieldInForm: state.setFieldInForm
  })))

  return (
    <div className="wrapper">
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
              <input value={form.slug} onChange={(e) => setFieldInForm('slug', e.target.value)} type="text" placeholder="Введіть значення" className="input" />
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
      </div>
    </div>
  )
}