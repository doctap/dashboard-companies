import { type AccountType } from '../../mybuh';

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
