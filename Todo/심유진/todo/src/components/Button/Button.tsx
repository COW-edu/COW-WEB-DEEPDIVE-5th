import React from "react";
import { Icon } from "../Icon";

type Props = {
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  buttonType: "Icon" | "Text";
  name: string;
};

const ButtonContent = ({
  buttonType,
  name,
}: {
  buttonType: "Icon" | "Text";
  name: string;
}) => {
  const renderContent = () => {
    switch (buttonType) {
      case "Icon":
        return <Icon name={name} size={24} />;
      case "Text":
        return <span className="text-black">{name}</span>;
      default:
        return null;
    }
  };

  return renderContent();
};

export function Button({
  onClick,
  children,
  name,
  className = "",
  disabled = false,
  buttonType,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`bg-white border-2 border-black py-2 flex justify-center w-20 rounded-lg ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      disabled={disabled}
    >
      {children}
      <ButtonContent buttonType={buttonType} name={name} />
    </button>
  );
}
