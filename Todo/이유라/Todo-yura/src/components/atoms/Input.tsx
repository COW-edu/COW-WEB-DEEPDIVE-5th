import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: 'text' | 'checkbox';
}

const styles = {
  text: 'w-[450px] h-10 p-2 text-primary-black focus:outline-none',
  checkbox: 'w-6 h-6 mr-4',
};

const Input = ({ type, ...props }: InputProps) => {
  return <input type={type} className={`${styles[type]}`} {...props} />;
};

export default Input;
