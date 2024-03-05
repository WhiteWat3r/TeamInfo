import style from './RegistrationForm.module.scss';
import { Input } from '../Input/Input';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Button } from '../Button/Button';
import { useRegistrationMutation } from '../../api/authApi';
import { setCookie } from '../../utils/cookie';
import { useDispatch } from 'react-redux';
import { login } from '../../services/mainSlice';

interface registerForm {
  name: string;
  email: string;
  password: string;
  repeatedPassword?: string;
}

export const RegistrationForm = () => {
  const [registration] = useRegistrationMutation();
  const dispatch = useDispatch();
  const {
    register,
    getValues,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<registerForm>({ mode: 'onBlur' });

  const [passwordShown, setPasswordShown] = useState(false);
  const [repeatedPasswordShown, setRepeatedPasswordShown] = useState(false);
  const [registrationError, setRegistrationError] = useState('');

  const handleAuth = async () => {
    const email = getValues('email');
    const password = getValues('password');

    const response: any = await registration({ email, password });

    if (response.error) {
      setRegistrationError(response.error.data.error);
    } else {
      setRegistrationError('');
      setCookie('token', response.data.token);
      setCookie('email', encodeURIComponent(email));

      dispatch(login(email));
    }
  };

  return (
    <form className={style.registration} onSubmit={handleSubmit(handleAuth)}>
      <h2 className={style.registration__header}>Регистрация</h2>
      <Input
        id="name"
        validation={{ ...register('name', { required: 'Это обязательноe поле' }) }}
        labelText="Имя"
        type="text"
        error={errors.name?.message}
      />
      <Input
        id="email"
        validation={{
          ...register('email', {
            required: 'Это обязательноe поле',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Некорректный адрес электронной почты',
            },
          }),
        }}
        labelText="Электронная почта"
        type="text"
        error={errors.email?.message}
      />
      <Input
        id="password"
        validation={{ ...register('password', { required: 'Это обязательноe поле' }) }}
        labelText="Пароль"
        type={passwordShown ? 'text' : 'password'}
        onButtonClick={() => setPasswordShown(!passwordShown)}
        visible={passwordShown}
        error={errors.password?.message}
      />
      <Input
        id="repeatedPassword"
        validation={{
          ...register('repeatedPassword', {
            required: 'Это обязательноe поле',
            validate: (value) => value === watch('password') || 'Пароли не совпадают',
          }),
        }}
        labelText="Подтвердите пароль"
        type={repeatedPasswordShown ? 'text' : 'password'}
        onButtonClick={() => setRepeatedPasswordShown(!repeatedPasswordShown)}
        visible={repeatedPasswordShown}
        error={errors.repeatedPassword?.message}
      />
      {registrationError && <span className={style.registration__error}>{registrationError}</span>}

      <div className={style.registration__buttonContainer}>
        <Button
          mode={'tertiary'}
          type={'submit'}
          // isDisabled={!isValid}
        >
          Зарегистрироваться
        </Button>
      </div>
    </form>
  );
};
