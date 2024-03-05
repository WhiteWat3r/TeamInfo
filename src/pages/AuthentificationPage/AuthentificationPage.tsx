import style from './AuthentificationPage.module.scss';
import { Button } from '../../components/Button/Button';
import { useState } from 'react';
import { RegistrationForm } from '../../components/RegistrationForm/RegistrationForm';
import { LoginForm } from '../../components/LoginForm/LoginForm';

export const AuthentificationPage = () => {
  const [currentPage, setCurrentPage] = useState('login');

  return (
    <div className={style.container}>
      {currentPage === 'login' ? <LoginForm /> : <RegistrationForm />}
      <div className={style.buttonContainer}>
        <Button
          mode={'secondary'}
          type="button"
          onClick={() => setCurrentPage(currentPage === 'login' ? 'registration' : 'login')}>
          {currentPage === 'login'
            ? 'Еще нет аккаунта? Зарегистрироваться'
            : 'Уже есть аккаунт? Войти'}
        </Button>
      </div>
    </div>
  );
};
