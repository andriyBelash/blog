'use client'
import Button from "@/src/app/components/ui/button/Button";
import Link from "next/link";
import Article from "@/src/app/components/article/Article";
import Loader from "@/src/app/components/ui/loader/Loader";

import { useUserStore } from "@/src/stores/user.store";
import { useEffect } from "react";

import type { IArticle } from "@/src/types/articles";

const List: React.FC<{ articles: IArticle[] }> = ({ articles }) => {
  return (
    <div className="grid grid-cols-3 gap-4 mt-6">
      {articles.map((article) => (
        <Article key={article.id} article={article} my={true} />
      ))}
    </div>
  )
}

export default function Page() {
  const { articles, globalLoader, params, getArticles } = useUserStore()
  
  useEffect(() => {
    getArticles()
  }, [getArticles, params])

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1>Ваші статті</h1>
        <Link href='/articles/form/create'>
          <Button type='outline'>Створити статтю</Button>
        </Link>
      </div>
        {!globalLoader ? <List articles={articles} /> : <Loader type='linear' size="100%" color="var(--blue)" />}
      
    </section>
  )
}