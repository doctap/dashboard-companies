import React, { useEffect } from 'react';
import { deleteCompany, fetchCompanies } from '../../../api/http-client/http-client';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks/redux';
import { Shade } from '../../containers';
import { EditForm } from '../../forms';
import { CompanyCardList } from '../../lists';
import { ModalConfirmation } from '../../modalWindows';
import styles from './MyCompaniesPage.module.scss';

export const MyCompaniesPage = () => {
  const { items, error, isLoading } = useAppSelector(st => st.companySlice);
  const { isShow, indexModal } = useAppSelector(st => st.modalConfirmSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCompanies());
  }, []);

  return (
    <div className={styles.myCompaniesPage}>
      <div className={styles.title}>
        {error !== '' ? error : 'Мои организации'}
      </div>

      {
        isLoading
          ? <h1>Loading...</h1>
          : <div className={styles.CompanyCardList}>
            <CompanyCardList cards={items} />
          </div>
      }

      {
        isShow
          ? <Shade>
            <div className={styles.ModalConfirmation_size}>
              {modals[indexModal]}
            </div>
          </Shade>
          : null
      }
    </div>
  );
};

// порядок элементов менять нельзя
const modals: JSX.Element[] = [
  <ModalConfirmation
    title='Удаление организации'
    message='Вы уверены, что хотите удалить организацию из списка?'
    cancelText='Отменить'
    confirmText='Удалить'
    onConsent={deleteCompany}
    key={1}
  />,
  <EditForm
    key={2}
  />
];
