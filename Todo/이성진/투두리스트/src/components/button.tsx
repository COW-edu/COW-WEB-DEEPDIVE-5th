import React from "react";

interface ButtonProps {
    label: string
    onClink: () => void;
    disabled?: boolean;
    variant?: "primary" | "secondary" | "danger" ;
}

const Button: React.FC<ButtonProps> = ({ label, onClick,

})