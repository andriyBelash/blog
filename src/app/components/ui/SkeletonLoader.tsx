import React from 'react';

const SkeletonLoader = ({ width = '100%', height = '20px', borderRadius = '4px', count = 1 }) => {
  const skeletonStyle = {
    width,
    height,
    backgroundColor: 'var(--secondary)',
    borderRadius,
    marginBottom: '10px',
    animation: 'pulse 1.5s ease-in-out infinite',
  };

  return (
    <>
      <style>
        {`
          @keyframes pulse {
            0% {
              opacity: 0.6;
            }
            50% {
              opacity: 1;
            }
            100% {
              opacity: 0.6;
            }
          }
        `}
      </style>
      {[...Array(count)].map((_, index) => (
        <div key={index} style={skeletonStyle} />
      ))}
    </>
  );
};

export default SkeletonLoader;