'use client'
import Button from "@/src/app/components/ui/button/Button";
import Link from "next/link";
import Article from "@/src/app/components/article/Article";
import Loader from "@/src/app/components/ui/loader/Loader";
import SingleSelect from "@/src/app/components/ui/select/SingleSelect";
import Pagination from "@/src/app/components/base/pagination/Pagination";

import { useUserStore } from "@/src/stores/user.store";
import { useArticlesStore } from "@/src/stores/articles.store";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { parseQueryParams } from "@/src/lib/functions";
import { ARTICLES_FIND_BY_STATUS } from "@/src/lib/constants";
import { confirmAlert } from 'react-confirm-alert';


import type { IArticle } from "@/src/types/articles";

import 'react-confirm-alert/src/react-confirm-alert.css'; 


interface ListProps {
  articles: IArticle[],
  onEdit: (slug: string) => void
  onDelete: (id: number) => void
}

const List: React.FC<ListProps> = ({ articles, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-3 gap-4 mt-6">
      {articles.map((article) => (
        <Article 
          key={article.id} 
          article={article} 
          my={true} 
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

export default function Page() {
  const { articles, globalLoader, params, getArticles, setNewParams } = useUserStore()

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const changeStatus = (value: string | null) => {
    if(value) {
      const params = new URLSearchParams(searchParams.toString())
      router.push(`${pathname}?${params.toString()}`)
      params.set('status', value)
      params.set('page', '1')
      router.push(`${pathname}?${params.toString()}`)
    }
  }

  const onEdit = (slug: string) => {
    router.push(`/articles/form/edit/${slug}`)
  }

  const confirmDelete = (id: number) => {
    confirmAlert({
      message: 'Ви впевнені, що хочете видалити статтю?',
      buttons: [
        {
          label: 'Так',
          onClick: () => onDelete(id)
        },
        {
          label: 'Ні'
        }
      ]
    })
  }
  
  const onDelete = (id: number) => {
    useArticlesStore.getState().deleteArticle(id)
  }


  useEffect(() => {
    const params = parseQueryParams(searchParams)
    setNewParams(params)
    getArticles(params)
  }, [getArticles, setNewParams, searchParams])

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1>Ваші статті</h1>
        <Link href='/articles/form/create'>
          <Button type='outline'>Створити статтю</Button>
        </Link>
      </div>
      <div>
        <SingleSelect 
          options={ARTICLES_FIND_BY_STATUS}
          selected={params.status}
          onChange={(value) => changeStatus(value)} 
        />
      </div>
      { globalLoader && <Loader type='linear' size="100%" color="var(--blue)" /> }
      <div className="flex flex-col gap-4">
        <List articles={articles} onEdit={onEdit} onDelete={confirmDelete} />
       {!globalLoader && <Pagination 
          className="mt-6"
          total={params.total}
          perPage={6}
          currentPage={searchParams.get('page') ? Number(searchParams.get('page')) : 1}
        />}
      </div>
    </section>
  )
}