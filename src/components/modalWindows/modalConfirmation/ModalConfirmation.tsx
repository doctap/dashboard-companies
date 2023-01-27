import React from 'react';
import { fetchCompanies } from '../../../api/http-client/http-client';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks/redux';
import { modalWindowSlice } from '../../../redux/reducers/ModalWindowSlice';
import { Button, IconButton } from '../../elements';
import { BtnVariants } from '../../elements/buttons/btns/ButtonInterface';
import styles from './ModalConfirmation.module.scss';

interface IModalConfirmation {
  title: string
  message: string
  confirmText: string
  cancelText: string
  onConsent: (id: number) => void
}

export const ModalConfirmation = (props: IModalConfirmation) => {
  const { manageWindow } = modalWindowSlice.actions;
  const { idCompany } = useAppSelector(st => st.modalConfirmSlice);
  const dispatch = useAppDispatch();
  
  const closeWindow = () => dispatch(manageWindow({ isShow: false, idCompany: 0, indexModal: 0 }));

  const onClick = () => {
    props.onConsent(idCompany);
    closeWindow();
    dispatch(fetchCompanies());
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
            name={props.cancelText}
            variant={BtnVariants.Border}
            type='button'
            onClick={closeWindow}
          />
        </div>
        <div className={styles.confirm}>
          <Button
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
