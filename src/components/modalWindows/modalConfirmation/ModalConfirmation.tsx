import React from 'react';
import { Button, IconButton } from '../../elements';
import { BtnVariants } from '../../elements/buttons/btns/ButtonInterface';
import styles from './ModalConfirmation.module.scss';

interface IModalConfirmation {
  title: string
  message: string
  confirmText: string
  cancelText: string
  onConsent: (id: number) => void
  idSubject: number
  onClose: () => void
}

export const ModalConfirmation = (props: IModalConfirmation) => {
  const closeWindow = () => { props.onClose(); };

  const onClick = () => {
    closeWindow();
    props.onConsent(props.idSubject);
  };

  return (
    <div className={styles.modalConfirmation}>
      <div className={styles.title}>
        {props.title}
      </div>

      <div className={styles.IconButton}>
        <IconButton color='#486377' model='close' onClick={closeWindow} />
      </div>

      <div className={styles.message}>
        {props.message}
      </div>

      <div className={styles.panel}>
        <div className={styles.cancel}>
          <Button
            text={props.cancelText}
            name={props.cancelText}
            variant={BtnVariants.Border}
            type='button'
            onClick={closeWindow}
          />
        </div>
        <div className={styles.confirm}>
          <Button
            text={props.confirmText}
            name={props.confirmText}
            variant={BtnVariants.Primary}
            type='button'
            onClick={onClick}
          />
        </div>
      </div>
    </div>
  );
};
