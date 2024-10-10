import React from 'react'

import './button.css'

interface Props {
  children?: React.ReactNode,
  className?: string,
  onClick?: () => void,
  type?: 'filled' | 'outline',
  size?: 'small' | 'medium' | 'large',
}


const Button: React.FC<Props> = ({ children, className, onClick, type = 'filled', size = 'medium' }) => {
  return (
    <button className={`${className} ${type}-type ${size}-size`} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button