'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import Link from 'next/link'
import { cn } from '@/src/lib/functions'

interface PaginationProps {
  total: number
  perPage?: number
  currentPage?: number
  className?: string
}

export default function Pagination({
  total,
  perPage = 10,
  currentPage = 1,
  className,
}: PaginationProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Захист від некоректних значень
  const safeTotalPages = Math.max(1, Math.ceil(total / perPage))
  const safeCurrentPage = Math.min(Math.max(1, currentPage), safeTotalPages)

  // Створення URL зі збереженням параметрів
  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  // Генерація масиву номерів сторінок
  const pageNumbers = useMemo(() => {
    const pages: (number | string)[] = []

    if (safeTotalPages <= 7) {
      for (let i = 1; i <= safeTotalPages; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)

      if (safeCurrentPage > 3) {
        pages.push('...')
      }

      const start = Math.max(2, safeCurrentPage - 1)
      const end = Math.min(safeTotalPages - 1, safeCurrentPage + 1)

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      if (safeCurrentPage < safeTotalPages - 2) {
        pages.push('...')
      }

      if (safeTotalPages > 1) {
        pages.push(safeTotalPages)
      }
    }

    return pages
  }, [safeCurrentPage, safeTotalPages])

  // Якщо тільки одна сторінка, не показуємо пагінацію
  if (safeTotalPages <= 1) return null

  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      className={cn('flex items-center justify-center gap-2', className)}
    >
      {/* Кнопка "Попередня" */}
      {safeCurrentPage > 1 && (
        <Link
          href={createPageUrl(safeCurrentPage - 1)}
          className={cn(
            'px-4 py-2 text-sm border rounded-md',
            'hover:bg-gray-50 transition-colors',
            'flex items-center justify-center'
          )}
        >
          Попередня
        </Link>
      )}

      {/* Номери сторінок */}
      <div className="flex items-center gap-1">
        {pageNumbers.map((page, index) => {
          if (page === '...') {
            return (
              <span
                key={`dots-${index}`}
                className="w-10 h-10 flex items-center justify-center text-gray-500"
              >
                ...
              </span>
            )
          }

          const pageNumber = page as number
          const isActive = pageNumber === safeCurrentPage

          return (
            <Link
              key={pageNumber}
              href={createPageUrl(pageNumber)}
              className={cn(
                'w-10 h-10 flex items-center justify-center rounded-md',
                'border transition-colors',
                isActive 
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'hover:bg-gray-50'
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              {pageNumber}
            </Link>
          )
        })}
      </div>

      {/* Кнопка "Наступна" */}
      {safeCurrentPage < safeTotalPages && (
        <Link
          href={createPageUrl(safeCurrentPage + 1)}
          className={cn(
            'px-4 py-2 text-sm border rounded-md',
            'hover:bg-gray-50 transition-colors',
            'flex items-center justify-center'
          )}
        >
          Наступна
        </Link>
      )}
    </nav>
  )
}