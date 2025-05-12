import React from 'react';

const DemoPaper = ({ children, className = '' }) => {
  return (
    <div 
      className={`w-full p-4 text-center border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg shadow-sm ${className}`}
    >
      {children}
    </div>
  );
};

export default DemoPaper;
