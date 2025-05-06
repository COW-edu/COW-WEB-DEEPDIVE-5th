import React from 'react';

// 타입부터 정의
interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant: 'toggle' | 'primary' | 'submit' | 'filter' | 'delete';
  active?: boolean; //filter 활성화 여부
  className?: string;
}

// 스타일 속성
const variants = {
  toggle: 'px-4 py-2 rounded-2xl bg-secondary-gray text-primary-black ',
  primary: 'px-4 py-2 rounded bg-primary-green',
  submit: 'px-4 py-2 -mr-0 w-auto h-10 rounded-sm bg-primary-green',
  delete: 'text-xl text-primary-lime ml-auto hidden group-hover:block',
  filter: 'px-4 py-0 rounded-md border-2 border-transparent',
};
const activeStyles = {
  toggle: 'px-4 py-2 rounded-2xl bg-secondary-carrotShadow text-white',
  filter: 'px-4 py-0 rounded border-2 border-primary-green',
};

const Button = ({
  children,
  variant = 'primary',
  active = false,
  className = '',
  ...props
}: ButtonProps) => {
  const variantClass = variants[variant];
  const activeClass = active ? activeStyles[variant] : '';
  const combinedClassName = `${active ? activeClass : variantClass} ${className}`;

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
};

export default Button;
