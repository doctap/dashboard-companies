import React from 'react';
import type { ICompany } from '../../../api';
import { EditDeleteButtons } from '../../elements';
import { ImageCard } from '../imageCard/ImageCard';
import styles from './CompanyCard.module.scss';

interface ICompanyCard {
  typeNumber: string
  onEditCompany: (id: number) => void
  onDeleteCompany: (id: number) => void
}

export const CompanyCard = (props: ICompany & ICompanyCard) => {
  return (
    <div className={styles.companyCard}>

      <div className={styles.card}>
        <div className={styles.ImageCard}>
          <ImageCard src={props.logo} alt='logo' />
        </div>

        <div className={styles.text}>
          <div className={styles.companyName}>
            <div className={styles.shortName}>{props.shortName}</div>
            <div>{props.company_name}</div>
          </div>
          <div className={styles.companyNumber}>
            <div className={styles.typeNumber}>{props.typeNumber}</div>
            <div>{props.company_tin}</div>
          </div>
        </div>
      </div>

      <div className={styles.EditDeleteButtons}>
        <EditDeleteButtons
          color1='#005DA1'
          color2='#D20000'
          model1='edit_square'
          model2='delete'
          onClick1={() => { props.onEditCompany(props.id); }}
          onClick2={() => { props.onDeleteCompany(props.id); }}
        />
      </div>

    </div>
  );
};
