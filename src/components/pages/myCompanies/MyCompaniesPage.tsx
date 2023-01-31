import React, { useCallback, useEffect } from 'react';
import {
  deleteCompanyRequest,
  fetchCompanies,
  fetchCompanyDataById,
  sendFormTooIP,
  sendFormLegalEntity,
  sendFormPrivatePractice,
  sendFormNewOrganization,
  type IBodyUL,
  type IBodyCHP,
  type IBodyFIZ,
  type IBodyTooIP,
  getLogList
} from '../../../api';
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
  const { companyData, isLoadingData, queryError } = useAppSelector(st => st.companyDataSlice);
  const { manageWindow, showHideWindow } = modalWindowSlice.actions;
  const dispatch = useAppDispatch();

  const submitTooIP = (body: IBodyTooIP) => {
    sendFormTooIP(body);
    dispatch(showHideWindow(false));
    console.log(getLogList(items));
  };

  const submitFormLegalEntity = (body: IBodyUL) => {
    sendFormLegalEntity(body);
    dispatch(showHideWindow(false));
    console.log(getLogList(items));
  };

  const submitFormPrivatePractice = (body: IBodyCHP) => {
    sendFormPrivatePractice(body);
    dispatch(showHideWindow(false));
    console.log(getLogList(items));
  };

  const submitFormNewOrganization = (body: IBodyFIZ) => {
    sendFormNewOrganization(body);
    dispatch(showHideWindow(false));
    console.log(getLogList(items));
  };

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
      onSubmitFormNewOrganization={submitFormNewOrganization}
      onSubmitFormPrivatePractice={submitFormPrivatePractice}
      onSubmitFormLegalEntity={submitFormLegalEntity}
      companyData={{ companyData, isLoadingData, queryError }}
      onSubmitTooIP={submitTooIP}
      idCompany={idCompany}
      business={business}
      key={2}
    />
  ];

  const editCompany = useCallback(
    function (id: number) {
      dispatch(fetchCompanyDataById(id));
      dispatch(manageWindow({ isShow: true, idCompany: id, indexModal: 1 }));
    }, []);

  const deleteCompany = useCallback(
    function (id: number) {
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
