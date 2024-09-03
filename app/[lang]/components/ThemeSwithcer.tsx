'use client'

import React from 'react'
import Moon from './Moon'
import Sun from './Sun'
import { useTheme } from '@/app/components/ThemeProvider'

const ThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="p-1 rounded-full theme-switcher"
      style={{ background: theme === 'light' ? '#1A1A1A' : '#ffffff' }}
      aria-label="Toggle theme"
    >
      { theme === 'light' ? <Sun/> : <Moon/> }
    </button>
  )
}

export default ThemeSwitcher