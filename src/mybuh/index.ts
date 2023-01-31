import type { AccountType, IBodyCHP, IBodyFIZ, IBodyTooIP, ICompanyResponse } from '../api';
import type { CodeOwnShips, ShortName, TaxCode } from '../types';
import { companies } from './companies';
import { formToSystem } from './form-to-system';
import { ownerships } from './ownerships';
import { taxSystems } from './tax-systems';

// bad functions for EXAMPLE server queries
export const GET_COMPANIES_SERVER = (): ICompanyResponse[] => {
  const result: ICompanyResponse[] = [];
  
  const getShortName = (formId: number) => {
    const findingOwnShip = ownerships.find(v => v.id === formId) as IOwnershipsServe;

    return findingOwnShip.short;
  };

  companies.forEach(v => {
    const isExist = formToSystem.some(s => s.tax_system_id === v.tax_id && s.form_ownership_id === v.form_id);
    if (isExist) {
      result.push({
        id: v.company_id,
        company_name: v.company_name,
        company_tin: v.company_tin,
        logo: v.logo,
        shortName: getShortName(v.form_id)
      });
    }
  });

  return result;
};

export const DELETE_COMPANY_SERVER = (id: number) => {
  const result = companies.filter(v => v.company_id !== id);
  companies.length = 0;
  companies.push(...result);
  console.log(companies);
};

const GET_TAX_TYPES = (legalEntity: AccountType | null): ITax[] | null => {
  if (legalEntity === null) return null;

  const owns = ownerships.filter(v => v.account_type === legalEntity);
  const formSystem = formToSystem.filter(v => owns.some(q => q.id === v.form_ownership_id));

  const taxies = taxSystems.filter(v => formSystem.some(q => q.tax_system_id === v.id));
  return taxies.map(v => ({ code: v.code, full: v.full }));
};

const GET_OWNERSHIPS = (legalEntity: AccountType | null): IOwnership[] | null => {
  if (legalEntity === null) return null;
  const owns = ownerships.filter(v => v.account_type === legalEntity);

  return owns.map(v => ({ code: v.code, full: v.full }));
};

export const GET_COMPANY_DATA_BY_ID_SERVER = (idCompany: number): IFormResponseServer => {
  const findingCompany = companies.find(v => v.company_id === idCompany);
  if (findingCompany === undefined) throw new Error('404 not Found');

  const findingFormToSystem = formToSystem.find(v => v.form_ownership_id === findingCompany.form_id && v.tax_system_id === findingCompany.tax_id);
  if (findingFormToSystem === undefined) throw new Error('404 not Found');

  const findingOwnShip = ownerships.find(v => v.id === findingFormToSystem.form_ownership_id);
  if (findingOwnShip === undefined) throw new Error('404 not Found');

  const taxTypes = GET_TAX_TYPES(findingOwnShip.account_type);
  const ownershipTypes = GET_OWNERSHIPS(findingOwnShip.account_type);

  const res = {
    accountType: findingOwnShip.account_type,
    companyName: findingCompany.company_name,
    companyTin: findingCompany.company_tin,
    codeOwnShips: findingOwnShip.code,
    shortName: findingOwnShip.short,
    taxTypes,
    ownershipTypes
  };
  console.log(res);
  return res;
};

export const POST_REQUEST_TOO_IP = (body: IBodyTooIP) => {
  const findingCompany = companies.find(v => v.company_id === body.companyId) as ICompanyServe;
  const findingForm = formToSystem.find(v => v.form_ownership_id === body.companyId) as IFormToSystemServe;

  const findingTax = taxSystems.find(v => v.code === body.tax) as ITaxSystemsServe;
  findingCompany.tax_id = findingTax.id;
  findingForm.tax_system_id = findingTax.id;
};

export const POST_REQUEST_CHP = (body: IBodyCHP) => {
  const findingCompany = companies.find(v => v.company_id === body.companyId) as ICompanyServe;
  const findingOwnShip = ownerships.find(v => v.code === body.ownership) as IOwnershipsServe;
  const findingForm = formToSystem.find(v => v.form_ownership_id === findingCompany.form_id) as IFormToSystemServe;

  findingForm.form_ownership_id = findingOwnShip.id;
  findingCompany.form_id = findingOwnShip.id;

  findingCompany.company_name = body.companyName;
  findingCompany.company_tin = body.companyTin;
};

export const POST_REQUEST_FIZ = (body: IBodyFIZ) => {
  const findingCompany = companies.find(v => v.company_id === body.companyId) as ICompanyServe;
  findingCompany.company_name = body.companyName;
  findingCompany.company_tin = body.companyTin;
};

export interface IFormResponseServer {
  accountType: AccountType | null
  shortName: ShortName
  companyTin: string
  companyName: string
  codeOwnShips: CodeOwnShips
  taxTypes: ITax[] | null
  ownershipTypes: IOwnership[] | null
}

export interface ITax {
  code: TaxCode
  full: string
}

export interface IOwnership {
  code: CodeOwnShips
  full: string
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
  short: ShortName
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
