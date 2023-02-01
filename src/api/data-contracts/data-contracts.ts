import type { IOwnership, ITax } from '../../mybuh';
import type { CodeOwnShips, ShortName, TaxCode } from '../../types';

export type AccountType = 'too' | 'ip' | 'chp' | 'fiz';

export interface ICompany {
  id: number
  logo: string
  company_name: string
  company_tin: string
  shortName: ShortName
}

export interface IItems<T> {
  items: T[]
  isLoading: boolean
  error: string
}

export interface IData<T> {
  companyData: T
  isLoadingData: boolean
  queryError: string
}

export interface ICompanyResponse {
  id: number
  company_name: string
  company_tin: string
  logo: null | string
  shortName: ShortName
}

export interface ICompanyData {
  accountType: AccountType
  short: ShortName
  companyTin: string
  companyName: string
  codeOwnShips: CodeOwnShips
  codeTax: TaxCode
  taxTypes: ITax[]
  ownershipTypes: IOwnership[]
}

export interface IBodyTooIP {
  companyId: number
  tax: string
}

export interface IBodyCHP {
  companyId: number
  companyTin: string
  companyName: string
  ownership: string
}

export interface IBodyFIZ {
  companyId: number
  companyTin: string
  companyName: string
}

export interface IBodyUL {
  companyId: number
  companyTin: string
  companyName: string
  tax: string
  ownership: string
}
