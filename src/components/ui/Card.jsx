// Card.jsx
import React from 'react';
import { clsx } from 'clsx';

// We'll break this into smaller pieces for better organization
// Think of these as the different parts of a picture frame
const Card = ({ children, className, ...props }) => {
  return (
    <div 
      className={clsx(
        'bg-white rounded-lg border-4 border-gray-700',
        'p-4 shadow-lg',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

// This is like the top part of the frame where you might put a title
const CardHeader = ({ children, className, ...props }) => {
  return (
    <div 
      className={clsx(
        'mb-4 pb-2 border-b-2 border-gray-200',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

// This is for the title text itself
const CardTitle = ({ children, className, ...props }) => {
  return (
    <h3 
      className={clsx(
        'text-xl font-bold',
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
};

// This is the main content area of the card
const CardContent = ({ children, className, ...props }) => {
  return (
    <div 
      className={clsx(
        'space-y-2',  // This adds some spacing between elements
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

// Export all pieces so we can use them separately
export { Card, CardHeader, CardTitle, CardContent };