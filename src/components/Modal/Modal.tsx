import { createPortal } from 'react-dom';
import style from './Modal.module.scss';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import { ChangeEvent, useState } from 'react';

const modalRoot = document.querySelector('#modal') as HTMLElement;

export const Modal = ({ closeModal }: { closeModal: () => void }) => {
  const [url, setUrl] = useState('');

  const handleCloseModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const targetElement = e.target as HTMLElement;
    if (targetElement.className.includes('container')) {
      closeModal();
    }
  };

  const handleСhoosePhoto = () => {
    localStorage.setItem('photo', url);
    closeModal();
  };

  return createPortal(
    <div className={style.container} onClick={(e) => handleCloseModal(e)}>
      <div className={style.modal}>
        <Input
          id={'url'}
          labelText={'Ссылка на фото'}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)}
          value={url}
        />
        <div className={style.modal__buttonContainer}>
          <Button type={'button'} mode={'primary'} onClick={handleСhoosePhoto}>
            Выбрать
          </Button>
        </div>
      </div>
    </div>,
    modalRoot,
  );
};
