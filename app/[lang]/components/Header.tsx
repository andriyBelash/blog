import React from 'react'
import LocaleSwitcher from './LocaleSwitcher'
import ThemeSwitcher from './ThemeSwithcer'


const Header = ({ locale }: { locale: string }) => {
  return (
    <header className='flex items-center justify-between wrapper py-4'>
      <span className='font-bold text-xl'>BLOG</span>
      <div className='flex items-center gap-4'>
        <LocaleSwitcher locale={locale}/>
        <ThemeSwitcher/>
      </div>
    </header>
  )
}

export default Header