import React from 'react'

interface Props {
  children: React.ReactNode
  title: string,
  subtitle: string
}

const FormCard: React.FC<Props> = ({ children, title, subtitle }) => {
  return (
    <div className='p-4 rounded-md border border-[var(--border)] bg-[var(--tertiary)] flex flex-col gap-6'>
      <div className='flex flex-col gap-2'>
        <h2 className='text-2xl font-bold'>{title}</h2>
        <p className='secondary-text'>{subtitle}</p>
      </div>
      {children}
    </div>
  )
}

export default FormCard