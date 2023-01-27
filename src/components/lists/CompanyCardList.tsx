import React from 'react';
import { type ICompany } from '../../api';
import { CompanyCard } from '../cards';

interface ICompanyCardList {
  cards: ICompany[]
}

export const CompanyCardList = (props: ICompanyCardList) => {
  return (
    <>
      {props.cards.map(v => (
        <CompanyCard
          id={v.id}
          account_type={v.account_type}
          company_name={v.company_name}
          company_tin={v.company_tin}
          logo={v.logo}
          typeNumber='иИн/бИн'
          key={v.id}
        />
      ))}
    </>
  );
};
