import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant: 'primary' | 'todo';
  message?: string;
  className?: string;
}

const Input = ({ variant, className = '', message, ...props }: InputProps) => {
  let inputClassName = '';

  if (variant === 'primary') {
    inputClassName =
      'border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500';
  } else if (variant === 'todo') {
    inputClassName =
      'border-b border-gray-400 px-2 py-1 focus:outline-none focus:border-blue-400 bg-transparent';
  }

  const combinedClassName = `${inputClassName} ${className}`.trim();

  return (
    <div className="w-full">
      <input className={combinedClassName} {...props} type="text" />
      {message && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {message}
        </p>
      )}
    </div>
  );
};

export default Input;
