'use client'
import React, { useState, useCallback, useMemo } from 'react'
import { FaChevronDown } from "react-icons/fa";
import { AnimatePresence, motion } from 'framer-motion';

interface Option {
  key: string;
  label: string;
}

interface SingleSelectProps {
  options: Option[];
  selected: string | null;
  onChange: (value: string | null) => void;
  placeholder?: string;
}

const SingleSelect: React.FC<SingleSelectProps> = React.memo(({ options, selected, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const handleSelect = useCallback((value: string) => {
    setIsOpen(false);
    onChange(value === selected ? null : value);
  }, [onChange, selected]);

  const selectedOption = useMemo(() => 
    options.find(option => option.key === selected),
    [options, selected]
  );

  const dropdownVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -5 }
  };

  return (
    <div className='relative'>
      <div 
        onClick={toggle} 
        className='input flex items-center cursor-pointer justify-between'
        role="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {selectedOption ? (
          <span className='primary-text'>{selectedOption.label}</span>
        ) : (
          <span className='secondary-text text-start'>{placeholder}</span>
        )}
        <motion.div 
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <FaChevronDown/>
        </motion.div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className='absolute bg-[var(--background)] w-full rounded-md border border-[var(--border)] z-10 overflow-hidden'
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2 }}
            role="listbox"
          >
            {options.map((option) => (
              <li
                key={option.key}
                onClick={() => handleSelect(option.key)}
                className={`primary-text px-2 py-2 hover:bg-[var(--tertiary)] cursor-pointer ${
                  option.key === selected ? '!bg-[var(--blue)] !text-white' : ''
                }`}
                role="option"
                aria-selected={option.key === selected}
              >
                {option.label}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
});

SingleSelect.displayName = 'SingleSelect';

export default React.memo(SingleSelect);