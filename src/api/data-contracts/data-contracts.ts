import type { IOwnership, ITax } from '../../mybuh';
import type { CodeOwnShips, TaxCode } from '../../types';

export type AccountType = 'too' | 'ip' | 'chp' | 'fiz';

export interface ICompany {
  id: number
  logo: string
  company_name: string
  company_tin: string
  account_type: AccountType
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
  account_type: AccountType | null
}

export interface ICompanyData {
  accountType: AccountType
  taxCode: TaxCode
  companyTin: string
  companyName: string
  codeOwnShips: CodeOwnShips
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
