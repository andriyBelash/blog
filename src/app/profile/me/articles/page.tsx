'use client'
import Button from "@/src/app/components/ui/button/Button";
import Link from "next/link";
import { useUserStore } from "@/src/stores/user.store";
import { useEffect } from "react";
import SkeletonLoader from "@/src/app/components/ui/SkeletonLoader";
import Article from "@/src/app/components/article/Article";
import type { IArticle } from "@/src/types/articles";

const Loader: React.FC = () => Array.from({ length: 9 }).map((_, index) => <SkeletonLoader height="200px" key={index} count={1} />)

const List: React.FC<{ articles: IArticle[] }> = ({ articles }) => {
  return (
    <>
      {articles.map((article) => (
        <Article key={article.id} article={article} my={true} />
      ))}
    </>
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
      <div className="grid grid-cols-3 gap-4 mt-6">
        {!globalLoader ? <List articles={articles} /> : <Loader />}
      </div>
    </section>
  )
}