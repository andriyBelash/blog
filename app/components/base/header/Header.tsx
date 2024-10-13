'use client'
import React, { useContext, useEffect, useState } from "react"
import ThemeContext from "@/context/theme"
import Account from "./Account"
import dynamic from 'next/dynamic'
import Image from "next/image"


// Динамічний імпорт ThemeSwitcher з відключеним SSR
const ThemeSwitcher = dynamic(() => import('./ThemeSwitcher'), { ssr: false })

const Header = () => {
  const { isDarkTheme, toggleThemeHandler } = useContext(ThemeContext);
  const [logoSrc, setLogoSrc] = useState("/logo/light-mode-logo.svg");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setLogoSrc(!isDarkTheme ? "/logo/light-mode-logo.svg" : "/logo/dark-mode-logo.svg");
  }, [isDarkTheme]);

  return (
    <div className="h-[90px] secondary-background border-b border-[var(--border)]">
      <div className="h-full flex items-center wrapper w-full justify-between">
        <Image
          src={logoSrc}
          alt="Next Blog Logo"
          width={158}
          height={36}
          className="cursor-pointer"
        />
        <div className="flex items-center gap-[12px]">
          <Account />
          {isMounted ? <ThemeSwitcher toggleThemeHandler={toggleThemeHandler} isDarkTheme={isDarkTheme} /> : <div className="thumb-wrapper"></div> }
        </div>
      </div>
    </div>
  )
}

export default React.memo(Header) // Memoize the Header