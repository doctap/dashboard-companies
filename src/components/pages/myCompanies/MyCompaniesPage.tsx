import React, { useEffect } from 'react';
import { fetchCompanies } from '../../../api/http-client/http-client';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks/redux';
import { CompanyCardList } from '../../lists';
import styles from './MyCompaniesPage.module.scss';

export const MyCompaniesPage = () => {
  const { items, error, isLoading } = useAppSelector(st => st.companySlice);
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
    </div>
  );
};
