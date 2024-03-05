import { Route, Routes } from 'react-router-dom';
import style from './App.module.scss';
import { MainPage } from './pages/MainPage/MainPage';
import { useEffect } from 'react';
import { login, setLikeArray } from './services/mainSlice';
import { useAppDispatch, useAppSelector } from './services/store';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';
import { AuthentificationPage } from './pages/AuthentificationPage/AuthentificationPage';
import { ProtectedRouteElement } from './components/ProtectedRouteElement/ProtectedRouteElement';
import { getCookie } from './utils/cookie';

function App() {
  const dispatch = useAppDispatch();

  const likes = useAppSelector((store) => store.main?.likeList);

  const token = getCookie('token');
  const email = getCookie('email');

  useEffect(() => {
    const storedLikes = localStorage.getItem('localLikes');
    if (storedLikes) {
      const likesArray = JSON.parse(storedLikes);
      // console.log(likesArray);
      dispatch(setLikeArray(likesArray));
    }
  }, []); //загрузка лайков в редакс при первоначальной инициализации

  useEffect(() => {
    if (likes.length > 0) {
      localStorage.setItem('localLikes', JSON.stringify(likes));
    }
  }, [likes]); //обновление массива лайков в сторедже

  useEffect(() => {
    if (email && token) {
      dispatch(login(decodeURIComponent(email)));
    }
  }, [token, email]); // если после авторизации кнопку 'выход' не нажимали, то считаем, что пользователь при любых других обстоятельствах авторизован

  return (
    <div className={style.app}>
      <Routes>
        <Route path={'/'} element={<ProtectedRouteElement element={<MainPage />} />} />
        <Route
          path={'/profile/:profileId'}
          element={<ProtectedRouteElement element={<ProfilePage />} />}
        />
        <Route
          path={'/authentification'}
          element={<ProtectedRouteElement anonymous element={<AuthentificationPage />} />}
        />
      </Routes>
    </div>
  );
}

export default App;
