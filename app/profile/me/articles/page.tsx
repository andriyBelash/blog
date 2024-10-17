import Button from "@/app/components/ui/button/Button";
import Link from "next/link";

export default async function Page() {
  return (
    <div className="flex flex-col gap-4">
      <section className="flex items-center justify-between">
        <h1>Ваші статті</h1>
        <Link href='/articles/form/create'>
          <Button type='outline'>Створити статтю</Button>
        </Link>  
      </section>      
    </div>
  )
}