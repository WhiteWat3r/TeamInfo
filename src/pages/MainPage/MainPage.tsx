import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../services/store';
import { deleteCookie } from '../../utils/cookie';
import { IPerson, logout, setPeopleList } from '../../services/mainSlice';
import { useFetchPeopleListQuery } from '../../api/peopleApi';
import { Button } from '../../components/Button/Button';
import Loader from '../../components/Loader/Loader';
import { ProfileCard } from '../../components/ProfileCard/ProfileCard';
import style from './MainPage.module.scss';
import arrow from '../../assets/Frame.svg';
import arrowTop from '../../assets/arrowTop.svg';
import exitImg from '../../assets/exit.svg';
import { useWindowWidth } from '../../utils/useWindiwWitdth';

export const MainPage = () => {
  const dispatch = useAppDispatch();
  const [perPage, setPerPage] = useState(8);

  const currentWidth = useWindowWidth();

  const fetchPeopleList = useFetchPeopleListQuery({ per_page: perPage });
  useEffect(() => {
    dispatch(setPeopleList(fetchPeopleList?.data?.data));
  }, [fetchPeopleList]);
  const peopleList = fetchPeopleList?.data?.data;

  const handleLogout = () => {
    dispatch(logout());
    deleteCookie('email');
    deleteCookie('token');
  };

  return (
    <div className={style.main}>
      <div className={style.main__topBar}>
        <h1 className={style.main__title}>Наша команда</h1>
        <h2 className={style.main__info}>
          Это опытные специалисты, хорошо разбирающиеся во всех задачах, которые ложатся на их
          плечи, и умеющие находить выход из любых, даже самых сложных ситуаций.
        </h2>
        <div className={style.main__buttonContainer}>
          <Button
            onClick={handleLogout}
            mode={currentWidth > 600 ? 'primary' : 'tertiary'}
            type={'button'}>
            {currentWidth > 600 ? 'Выход' : <img src={exitImg} alt={'Выход'} />}
          </Button>
        </div>
      </div>
      <ul className={style.main__list}>
        {peopleList && peopleList.length > 0 ? (
          peopleList.map((p: IPerson) => <ProfileCard key={p.id} person={p} />)
        ) : (
          <Loader />
        )}
      </ul>
      <div className={style.main__paginationButtonContainer}>
        <Button
          onClick={() => setPerPage(perPage === 8 ? perPage + 4 : perPage - 4)}
          mode={'secondary'}
          type={'button'}>
          {perPage === 8 ? 'Показать еще ' : 'Скрыть'}

          <img src={perPage === 8 ? arrow : arrowTop} alt={'Показать'} />
        </Button>
      </div>
    </div>
  );
};
