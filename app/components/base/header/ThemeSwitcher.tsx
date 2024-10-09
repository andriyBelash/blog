'use client'
import React from 'react'
import { IoMoonOutline } from "react-icons/io5";
import { IoSunnyOutline } from "react-icons/io5";

import './header.css'

const ThemeSwitcher: React.FC<{ toggleThemeHandler: () => void, isDarkTheme: boolean }> = ({ toggleThemeHandler, isDarkTheme }) => {
  return (
    <button className={`flex items-center justify-center cursor-pointer thumb-wrapper ${isDarkTheme ? 'active' : ''}`} onClick={toggleThemeHandler}>
      {!isDarkTheme ? <IoSunnyOutline size={24} /> : <IoMoonOutline size={24} />}
    </button>
  )
}

export default React.memo(ThemeSwitcher) // Memoize the ThemeSwitcher