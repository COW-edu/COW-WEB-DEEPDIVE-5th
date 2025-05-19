import React from "react";

type Props = {
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
};


export function Button({
  onClick,
  children,
  className = "",
  disabled = false,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`bg-white border-2 border-black py-2 flex justify-center w-20 rounded-lg ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
