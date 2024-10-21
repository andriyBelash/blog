// Loader.tsx
'use client';

import React from 'react';
import styles from './loader.module.css';

interface LoaderProps {
  type: 'spinner' | 'linear';
  size?: string;
  color?: string;
}

const Loader: React.FC<LoaderProps> = ({ type, size = '100%', color = '#2E3A4B' }) => {
  const commonStyle = {
    width: size,
    height: type === 'spinner' ? size : '4px'
  };

  if (type === 'spinner') {
    return (
      <div 
        className={styles.spinner} 
        style={{
          ...commonStyle,
          borderColor: `${color}`,
          borderTopColor: color
        }} 
      />
    );
  }

  return (
    <div className={styles.linearContainer} style={commonStyle}>
      <div 
        className={styles.linearBar} 
        style={{ backgroundColor: color }} 
      />
    </div>
  );
};

export default Loader;