import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger' | 'append' | 'reduce' | 'black'; //literal type
}
const Button = ({
  variant = 'primary',
  className = '',
  ...props
}: ButtonProps) => {
  const baseStyle =
    'px-4 py-2 rounded transition text-white font-medium focus:outline-none';

  const variantClassMap: Record<string, string> = {
    primary: 'bg-blue-500 hover:bg-blue-600',
    danger: 'bg-red-500 hover:bg-red-600',
    black: 'bg-black hover:bg-gray-800',
    append: 'bg-green-500 hover:bg-green-600',
    reduce: 'bg-yellow-500 hover:bg-yellow-600',
  };

  const varStyle = variantClassMap[variant] ?? '';
  const combinedClassName = `${baseStyle} ${varStyle} ${className}`.trim();

  return <button className={combinedClassName} {...props}></button>;
};

export default Button;
