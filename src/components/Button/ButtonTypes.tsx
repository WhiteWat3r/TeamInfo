import { ReactNode } from "react";

export interface IButtonProps {
    onClick?: () => void;
    children: ReactNode;
    mode: 'primary' | 'secondary' | 'tertiary';
    type: 'button' | 'submit';
    isDisabled?: boolean;
}