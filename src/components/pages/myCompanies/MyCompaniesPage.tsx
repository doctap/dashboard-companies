import React, { useEffect } from 'react';
import { deleteCompany, fetchCompanies } from '../../../api';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks/redux';
import type { BusinessType } from '../../../types';
import { Shade } from '../../containers';
import { EditForm } from '../../forms';
import { CompanyCardList } from '../../lists';
import { ModalConfirmation } from '../../modalWindows';
import styles from './MyCompaniesPage.module.scss';

const business: BusinessType[] = ['ТОО', 'ИП', 'Прочие'];

export const MyCompaniesPage = () => {
  const { items, error, isLoading } = useAppSelector(st => st.companySlice);
  const { isShow, indexModal, idCompany } = useAppSelector(st => st.modalConfirmSlice);
  const dispatch = useAppDispatch();

  // порядок элементов менять нельзя
  const modals: JSX.Element[] = [
    <ModalConfirmation
      idSubject={idCompany}
      title='Удаление организации'
      message='Вы уверены, что хотите удалить организацию из списка?'
      cancelText='Отменить'
      confirmText='Удалить'
      onConsent={deleteCompany}
      key={1}
    />,
    <EditForm
      idSubject={idCompany}
      business={business}
      key={2}
    />
  ];

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
            <div className={styles.Modal_size}>
              {modals[indexModal]}
            </div>
          </Shade>
          : null
      }
    </div>
  );
};
