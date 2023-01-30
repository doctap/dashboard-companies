import type { AccountType, ICompanyResponse } from '../api';
import type { CodeOwnShips, TaxCode } from '../types';
import { companies } from './companies';
import { formToSystem } from './form-to-system';
import { ownerships } from './ownerships';
import { taxSystems } from './tax-systems';

// bad functions for EXAMPLE server queries
export const GET_COMPANIES_SERVER = (): ICompanyResponse[] => {
  const result: ICompanyResponse[] = [];
  
  const getAccountType = (formId: number) => {
    const findingInSystem = formToSystem.find(v => v.form_ownership_id === formId);
    if (findingInSystem === undefined) return null;

    const findingOwnShip = ownerships.find(v => v.id === findingInSystem.form_ownership_id);
    if (findingOwnShip === undefined) return null;

    return findingOwnShip.account_type;
  };

  companies.forEach(v => result.push({
    id: v.company_id,
    company_name: v.company_name,
    company_tin: v.company_tin,
    logo: v.logo,
    account_type: getAccountType(v.form_id)
  }));

  return result;
};

export const DELETE_COMPANY_SERVER = (id: number) => {
  const result = companies.filter(v => v.company_id !== id);
  companies.length = 0;
  companies.push(...result);
  console.log(companies);
};

export const GET_COMPANY_DATA_BY_ID_SERVER = (idCompany: number): IFormResponseServer => {
  const findingCompany = companies.find(v => v.company_id === idCompany);
  if (findingCompany === undefined) throw new Error('404 not Found');

  const findingOwnShip = ownerships.find(v => v.id === findingCompany.form_id);
  if (findingOwnShip === undefined) throw new Error('404 not Found');

  const findingFormToSystem = formToSystem.find(v => v.form_ownership_id === findingCompany.form_id);
  if (findingFormToSystem === undefined) throw new Error('404 not Found');

  const findingTaxSystem = taxSystems.find(v => v.id === findingFormToSystem.tax_system_id);
  if (findingTaxSystem === undefined) throw new Error('404 not Found');

  return {
    accountType: findingOwnShip.account_type,
    companyName: findingCompany.company_name,
    companyTin: findingCompany.company_tin,
    codeOwnShips: findingOwnShip.code,
    taxCode: findingTaxSystem.code
  };
};

export interface IFormResponseServer {
  accountType: AccountType | null
  taxCode: TaxCode
  companyTin: string
  companyName: string
  codeOwnShips: CodeOwnShips
}

export interface ICompanyServe {
  company_id: number
  company_name: string
  company_tin: string
  form_id: number
  tax_id: number
  logo: null | string
}

export interface IFormToSystemServe {
  tax_system_id: number
  form_ownership_id: number
}

export interface IOwnershipsServe {
  id: number
  code: CodeOwnShips
  full: string
  short: string
  is_jur: boolean
  parent_id: number | null
  account_type: AccountType | null
}

export interface ITaxSystemsServe {
  id: number
  code: TaxCode
  full: string
  short: string
  parent_id: number | null
}
