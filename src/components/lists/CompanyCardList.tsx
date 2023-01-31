import React, { memo } from 'react';
import { type ICompany } from '../../api';
import { CompanyCard } from '../cards';

interface ICompanyCardList {
  cards: ICompany[]
  onDeleteCompany: (id: number) => void
  onEditCompany: (id: number) => void
}

export const CompanyCardList = memo(function CompanyCardList (props: ICompanyCardList) {
  return (
    <>
      {props.cards.map(v => (
        <CompanyCard
          onDeleteCompany={props.onDeleteCompany}
          onEditCompany={props.onEditCompany}
          id={v.id}
          shortName={v.shortName}
          company_name={v.company_name}
          company_tin={v.company_tin}
          logo={v.logo}
          typeNumber='иИн/бИн'
          key={v.id}
        />
      ))}
    </>
  );
});
