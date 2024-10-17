'use client'
import React, { useState } from 'react'
import { FaChevronDown } from "react-icons/fa";
import { AnimatePresence, motion } from 'framer-motion';

interface SingleSelectProps {
  options: { key: string, label: string }[]
}

const SingleSelect: React.FC<SingleSelectProps> = ({ options }) => {

  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className='relative'>
      <div onClick={toggle} className='input flex items-center cursor-pointer justify-between'>
        <span className='primary-text'>select {JSON.stringify(isOpen)}</span>
        {/* <span className='secondary-text'>placeholder</span> */}
        <div className={`ease-in duration-100 ${ isOpen ? 'rotate-180' : 'rotate-0' }`}>
          <FaChevronDown/>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.ul 
            className='absolute bg-[var(--background)] w-full rounded-md border border-[var(--border)]'
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            {options.map((option) => (
              <li key={option.key} className={`primary-text px-2 py-2 hover:bg-[var(--secondary)] cursor-pointer`}>
                {option.label}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

export default React.memo(SingleSelect)