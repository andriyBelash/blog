'use client'
import React, { useContext, useEffect, useState } from "react"
import Account from "./Account"
import dynamic from 'next/dynamic'
import Image from "next/image"

import { useUserStore } from "@/src/stores/user.store"
import { useQuery } from '@tanstack/react-query'
import Link from "next/link"


const Header = () => {
  const [ isMounted, setIsMounted ] = useState(false);

  const result = useQuery({
    queryKey: ['user'],
    queryFn: () => {
      return useUserStore.getState().getUser()
    },
    retry: false
  })
  

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="h-[90px] border-b border-[var(--border)]">
      <div className="h-full flex items-center wrapper w-full justify-between">
        <Link href="/">
          <Image
            src='/logo/light-mode-logo.svg'
            alt="Next Blog Logo"
            width={158}
            height={36}
            className="cursor-pointer"
          />
        </Link>
        <div className="flex items-center gap-[12px]">
          { !result.isLoading && isMounted && <Account />}
        </div>
      </div>
    </div>
  )
}

export default React.memo(Header) // Memoize the Header