import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaPencilAlt } from 'react-icons/fa';

import { useAppDispatch, useAppSelector } from '../../services/store';
import { logout } from '../../services/mainSlice';

import { Button } from '../../components/Button/Button';
import { Modal } from '../../components/Modal/Modal';
import Loader from '../../components/Loader/Loader';
import classNames from 'classnames';
import style from './ProfilePage.module.scss';

import phone from '../../assets/phone.svg';
import email from '../../assets/email.svg';
import backImg from '../../assets/back.svg';
import exitImg from '../../assets/exit.svg';

import { useFetchSinglePersonQuery } from '../../api/peopleApi';
import { useWindowWidth } from '../../utils/useWindiwWitdth';

export const ProfilePage = () => {
  const { profileId } = useParams();

  const currentWidth = useWindowWidth();

  const { data: fetchProfile } = useFetchSinglePersonQuery({ id: profileId });

  const profile = fetchProfile?.data;

  const userEmail = useAppSelector((store) => store.main.userEmail);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const localAvatar = localStorage.getItem('photo');
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const navigate = useNavigate();

  const contaktLinks = [
    { id: 1, img: phone, alt: 'Телефон', text: '+7 (954) 333-44-55' },
    { id: 2, img: email, alt: 'Почта', text: profile?.email },
  ];

  return (
    <>
      {profile ? (
        <div className={style.profile}>
          <div className={style.profile__topBar}>
            <div
              className={classNames(
                style.profile__buttonContainer,
                style.profile__buttonContainer_type_exit,
              )}>
              <Button
                onClick={handleLogout}
                mode={currentWidth > 600 ? 'primary' : 'tertiary'}
                type={'button'}>
                {currentWidth > 600 ? 'Выход' : <img src={exitImg} alt={'Выход'} />}
              </Button>
            </div>
            <div
              className={classNames(
                style.profile__buttonContainer,
                style.profile__buttonContainer_type_prev,
              )}>
              <Button
                onClick={() => navigate('/')}
                mode={currentWidth > 600 ? 'primary' : 'tertiary'}
                type={'button'}>
                {currentWidth > 600 ? 'Назад' : <img src={backImg} alt={'Назад'} />}
              </Button>
            </div>

            <div className={style.profile__header}>
              <div className={style.profile__imgContainer}>
                <img
                  className={style.profile__avatar}
                  src={localAvatar && userEmail == profile.email ? localAvatar : profile.avatar}
                  alt={'Аватар'}
                />
                {userEmail == profile.email && (
                  <button
                    onClick={() => setIsModalOpen(!isModalOpen)}
                    type={'button'}
                    className={style.profile__changeAvatarButton}>
                    <FaPencilAlt size={60} />
                  </button>
                )}
              </div>

              <div className={style.profile__info}>
                <h1 className={style.profile__name}>
                  {profile.first_name} {profile.last_name}
                </h1>
                <p className={style.profile__status}>Партнер</p>
              </div>
            </div>
          </div>

          <div className={style.profile__details}>
            <div className={style.profile__description}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Purus ut faucibus pulvinar elementum
                integer enim neque volutpat. In fermentum posuere urna nec. Penatibus et magnis dis
                parturient montes nascetur ridiculus. Aliquet nec ullamcorper sit amet risus nullam
                eget felis. Ornare massa eget egestas purus viverra accumsan. Congue quisque egestas
                diam in arcu cursus euismod quis.
              </p>
              <p>
                Rutrum quisque non tellus orci ac auctor augue mauris augue. Adipiscing tristique
                risus nec feugiat in fermentum posuere urna. Quis ipsum suspendisse ultrices gravida
                dictum fusce. At augue eget arcu dictum varius. Nulla aliquet porttitor lacus
                luctus. Tempor orci dapibus ultrices in iaculis. Habitant morbi tristique senectus
                et netus et. Eget lorem dolor sed viverra. Pellentesque dignissim enim sit amet
                venenatis urna cursus eget nunc. Quis hendrerit dolor magna eget est lorem ipsum
                dolor. Risus ultricies tristique nulla aliquet enim tortor at. Fermentum odio eu
                feugiat pretium nibh ipsum. Arcu odio ut sem nulla pharetra diam sit amet.
              </p>
              <p>
                Urna condimentum mattis pellentesque id nibh tortor id aliquet. Suspendisse ultrices
                gravida dictum fusce ut placerat orci nulla pellentesque. Nibh venenatis cras sed
                felis eget velit. Nibh praesent tristique magna sit amet purus gravida quis blandit.
                Volutpat diam ut venenatis tellus in metus vulputate. Vel pretium lectus quam id leo
                in vitae.
              </p>
            </div>
            <ul className={style.profile__contacts}>
              {contaktLinks.map((contact) => (
                <li key={contact.id} className={style.profile__contact}>
                  <img src={contact.img} alt={contact.alt} /> {contact.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <Loader />
      )}

      {isModalOpen && <Modal closeModal={() => setIsModalOpen(!isModalOpen)} />}
    </>
  );
};
