// Button.jsx
import React from 'react';
import { clsx } from 'clsx';  // This helps us manage our CSS classes

const Button = ({ 
  children,      // The content inside the button (like "Click Me")
  variant = 'default',  // The style variant (default, primary, etc.)
  size = 'medium',     // The size of the button
  onClick,       // What happens when the button is clicked
  className,     // Any additional CSS classes
  ...props       // Any other properties we might want to add
}) => {
  // This object defines our button styles for different variants
  const variants = {
    default: 'bg-gray-200 hover:bg-gray-300 border-gray-700',
    primary: 'bg-blue-500 hover:bg-blue-600 text-white',
    success: 'bg-green-500 hover:bg-green-600 text-white',
  };

  // This object defines our button sizes
  const sizes = {
    small: 'px-2 py-1 text-sm',
    medium: 'px-4 py-2',
    large: 'px-6 py-3 text-lg',
  };

  // Combine all our classes together
  const buttonClasses = clsx(
    'border-b-4 border-r-4 active:border-b-2 active:border-r-2',
    'active:translate-y-0.5 active:translate-x-0.5',
    'transition-all duration-50',
    variants[variant],
    sizes[size],
    className
  );

  return (
    <button 
      className={buttonClasses}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;