import React from 'react';
import { Button, IconButton } from '../../elements';
import { BtnVariants } from '../../elements/buttons/btns/ButtonInterface';
import styles from './ModalConfirmation.module.scss';

interface IModalConfirmation {
  title: string
  message: string
  confirmText: string
  cancelText: string
  onAction: () => void
}

export const ModalConfirmation = (props: IModalConfirmation) => {
  return (
    <div className={styles.modalConfirmation}>
      <div className={styles.title}>
        {props.title}
      </div>

      <div className={styles.IconButton}>
        <IconButton color='#486377' model='close' onClick={() => 0} />
      </div>

      <div className={styles.message}>
        {props.message}
      </div>

      <div className={styles.panel}>
        <div className={styles.cancel}>
          <Button
            name={props.cancelText}
            variant={BtnVariants.Border}
            type='button'
            onClick={() => 0}
          />
        </div>
        <div className={styles.confirm}>
          <Button
            name={props.confirmText}
            variant={BtnVariants.Primary}
            type='button'
            onClick={props.onAction}
          />
        </div>
      </div>
    </div>
  );
};
