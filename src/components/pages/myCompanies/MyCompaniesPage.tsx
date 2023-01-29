import React, { useCallback, useEffect } from 'react';
import { deleteCompanyRequest, fetchCompanies } from '../../../api';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks/redux';
import { modalWindowSlice } from '../../../redux/reducers/ModalWindowSlice';
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
  const { manageWindow, showHideWindow } = modalWindowSlice.actions;
  const dispatch = useAppDispatch();

  // порядок элементов менять нельзя
  const modals: JSX.Element[] = [
    <ModalConfirmation
      onClose={() => dispatch(showHideWindow(false))}
      idSubject={idCompany}
      title='Удаление организации'
      message='Вы уверены, что хотите удалить организацию из списка?'
      cancelText='Отменить'
      confirmText='Удалить'
      onConsent={deleteCompanyRequest}
      key={1}
    />,
    <EditForm
      idSubject={idCompany}
      business={business}
      key={2}
    />
  ];

  const editCompany = useCallback(
    function deleteCompany (id: number) {
      dispatch(manageWindow({ isShow: true, idCompany: id, indexModal: 1 }));
    }, []);

  const deleteCompany = useCallback(
    function deleteCompany (id: number) {
      dispatch(manageWindow({ isShow: true, idCompany: id, indexModal: 0 }));
    }, []);

  const hideWindow = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) { return; }
    dispatch(manageWindow({ isShow: false, idCompany: 0, indexModal: 0 }));
  };

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [isShow]);

  return (
    <div className={styles.myCompaniesPage}>
      <div className={styles.title}>
        {error !== '' ? error : 'Мои организации'}
      </div>

      {
        isLoading
          ? <h1>Loading...</h1>
          : <div className={styles.CompanyCardList}>
            <CompanyCardList
              onDeleteCompany={id => { deleteCompany(id); }}
              onEditCompany={id => { editCompany(id); }}
              cards={items}
            />
          </div>
      }

      {
        isShow
          ? <Shade onClick={hideWindow}>
            <div className={styles.Modal_size}>
              {modals[indexModal]}
            </div>
          </Shade>
          : null
      }
    </div>
  );
};
