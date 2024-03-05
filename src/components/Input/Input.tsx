import style from './Input.module.scss';
import { IInput } from './InputTypes';
import { LuEye, LuEyeOff } from 'react-icons/lu';

export const Input = ({
  validation,
  labelText,
  id,
  placeholder,
  type,
  onButtonClick,
  visible,
  error,
  value,
  onChange,
}: IInput) => {
  return (
    <div className={style.input}>
      {labelText && (
        <label htmlFor={id} className={style.input__label}>
          {labelText}
        </label>
      )}
      <input
        {...validation}
        id={id}
        type={type}
        className={style.input__value}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {onButtonClick && (
        <button type="button" className={style.input__check} onClick={onButtonClick}>
          {visible ? <LuEye size={'100%'} /> : <LuEyeOff size={'100%'} />}
        </button>
      )}
      <span className={style.input__warning}>{error}</span>
    </div>
  );
};
