import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import style from './LoginForm.module.scss';


import { useLoginMutation } from '../../api/authApi';
import { setCookie } from '../../utils/cookie';
import { login } from '../../services/mainSlice';

interface loginForm {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const [signIn] = useLoginMutation();
  const dispatch = useDispatch();
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<loginForm>({ mode: 'onBlur' });

  const [passwordShown, setPasswordShown] = useState(false);
  const [signInError, setSignInError] = useState('');

  const handleAuth = async () => {
    const email = getValues('email');
    const password = getValues('password');

    const response: any = await signIn({ email, password });

    if (response.error) {
      setSignInError(response.error.data.error);
    } else {
      setSignInError('');
      setCookie('token', response.data.token);
      setCookie('email', encodeURIComponent(email));

      dispatch(login(email));
    }
  };
  console.log(signInError);

  return (
    <form className={style.login} onSubmit={handleSubmit(handleAuth)}>
      <h2 className={style.login__header}>Авторизация</h2>
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
      {signInError && <span className={style.login__error}>{signInError}</span>}
      <div className={style.login__buttonContainer}>
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
