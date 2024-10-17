'use client'
import FormCard from "../../components/form/FormCard"
import ImageUploader from "../../components/form/ImageUploader"
import SingleSelect from "@/src/app/components/ui/select/SingleSelect"
import FormEditor from "../../components/form/FormEditor"
import { ARTICLES_STATUS } from "@/src/lib/constants"

export default function ArticlesFormCreate() {

  return (
    <div className="wrapper">
      <div className="pt-16 pb-8">
        <div className="grid gap-4 grid-cols-[1.5fr_1fr]">
          <div className="flex flex-col gap-4">
            <FormCard title="Зображення" subtitle="Вставте зображення для вашої статті">
              <ImageUploader/>
            </FormCard>
            <FormCard title="Заголовок" subtitle="Введіть заголовок для вашої статті">
              <input type="text" placeholder="Введіть заголовок" className="input" />
            </FormCard>
            <FormCard title="Текст" subtitle="Введіть текст для вашої статті">
              <FormEditor/>
            </FormCard>
          </div>
          <div className="flex flex-col gap-4">
            <FormCard title="Тег" subtitle="Введіть тег для вашої статті">
            < input type="text" placeholder="Введіть тег" className="input" />
            </FormCard>
            <FormCard title="Slug" subtitle="Cлаг вашої статті, він змінюється автоматично після оновлення заголовку">
              <input type="text" placeholder="Введіть значення" className="input" />
            </FormCard>
            <FormCard title="Статус" subtitle="Виберіть статус для вашої статті">
              <SingleSelect
                options={ARTICLES_STATUS}
              />
            </FormCard>
          </div>
        </div>
      </div>
    </div>
  )
}