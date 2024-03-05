import { Link } from 'react-router-dom';
import { IPerson, dislike, like } from '../../services/mainSlice';
import style from './ProfileCard.module.scss';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { GoHeart, GoHeartFill } from 'react-icons/go';

export const ProfileCard = ({ person }: { person: IPerson }) => {
  const dispatch = useAppDispatch();

  const localAvatar = localStorage.getItem('photo');
  const userEmail = useAppSelector((store) => store.main.userEmail);

  const likes = useAppSelector((store) => store.main?.likeList);

  const isLiked = likes.includes(person.id);

  const handleToggleLike = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (isLiked) {
      dispatch(dislike(person.id));
    } else {
      dispatch(like(person.id));
    }
  };

  return (
    <li>
      <Link
        className={classNames(style.card, userEmail === person.email && style.card_special)}
        to={`/profile/${person.id}`}>
        <img
          className={style.card__avatar}
          src={localAvatar && userEmail === person.email ? localAvatar : person.avatar}
          alt={person.first_name}
        />
        <h2 className={style.card__name}>
          {person.first_name} {person.last_name}
        </h2>
        <button
          className={classNames(style.card__like, isLiked && style.card__like_pressed)}
          type={'button'}
          onClick={(e) => handleToggleLike(e)}>
          {isLiked ? <GoHeartFill /> : <GoHeart />}
        </button>
      </Link>
    </li>
  );
};
