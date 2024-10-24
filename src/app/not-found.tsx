import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center h-screen gap-4'>
      <h1 className='text-[100px] font-bold leading-none'>404</h1>
      <p className='secondary-text text-[40px]'>Нажаль така сторінка не існує</p>
      <Link className='text-[var(--blue)]' href="/">На Головну</Link>
    </div>
  )
}