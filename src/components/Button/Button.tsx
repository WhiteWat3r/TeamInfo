import classNames from 'classnames';
import style from './Button.module.scss';
import { IButtonProps } from './ButtonTypes';

export const Button = ({ onClick, children, mode, type, isDisabled }: IButtonProps) => {
  return (
    <button
      disabled={isDisabled}
      type={type}
      onClick={onClick}
      className={classNames(style.button, style[`button_mode_${mode}`])}>
      {children}
    </button>
  );
};
