import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger';
}
const Button = ({
  variant = 'primary',
  className = '',
  ...props
}: ButtonProps) => {
  const baseStyle =
    'px-4 py-2 rounded transition text-white font-medium focus:outline-none';
  let varStyle = '';
  if (variant === 'primary') varStyle = 'bg-blue-500 hover:bg-blue-600';
  else if (variant == 'danger') varStyle = 'bg-red-500 hover:bg-red-600';
  else if (variant == 'black') varStyle = 'bg-black hover:bg-gray-800';

  const combinedClassName = `${baseStyle} ${varStyle}  ${className}`.trim();
  return <button className={combinedClassName} {...props}></button>;
};

export default Button;
