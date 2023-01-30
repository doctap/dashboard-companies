import { DELETE_COMPANY_SERVER, GET_COMPANIES_SERVER, GET_COMPANY_DATA_BY_ID_SERVER } from '../../mybuh';
import type { IFormResponseServer } from '../../mybuh';
import { companySlice } from '../../redux/reducers/CompanySlice';
import type { AppDispatch } from '../../redux/store/store';
import { base64 as building } from '../../images/building/base64';
import type { AccountType, ICompany, ICompanyResponse, ICompanyData } from '../data-contracts/data-contracts';
import { companyDataSlice } from '../../redux/reducers/CompanyDataSlice';

export const validatorCompany = (comp: ICompanyResponse[]) => {
  const companyRes = comp.filter(v => v.account_type !== null);
  const result = companyRes.map<ICompany>(v => {
    return {
      id: v.id,
      logo: v.logo ?? `data:image/png;base64, ${building}`,
      account_type: v.account_type as AccountType,
      company_name: v.company_name,
      company_tin: v.company_tin
    };
  });
  return result;
};

const validatorCompanyData = (data: IFormResponseServer): ICompanyData => {
  if (data.accountType === null) throw new Error('Not Found');

  return {
    accountType: data.accountType,
    codeOwnShips: data.codeOwnShips,
    companyName: data.companyName,
    companyTin: data.companyTin,
    taxCode: data.taxCode
  };
};

export const fetchCompanies = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(companySlice.actions.companiesFetching());
    const res = validatorCompany(GET_COMPANIES_SERVER());

    dispatch(companySlice.actions.companiesFetchingSuccess(res));
  } catch (e: any) {
    dispatch(companySlice.actions.companiesFetchingError(e.message));
  }
};

export const deleteCompanyRequest = (idCompany: number) => {
  try {
    DELETE_COMPANY_SERVER(idCompany);
  } catch (e: any) {
    // сообщить клиенту ошибку
  }
};

export const fetchCompanyDataById = (id: number) => async (dispatch: AppDispatch) => {
  try {
    dispatch(companyDataSlice.actions.companyDataFetching());
    const res = validatorCompanyData(GET_COMPANY_DATA_BY_ID_SERVER(id));

    dispatch(companyDataSlice.actions.companyDataFetchingSuccess(res));
  } catch (e: any) {
    dispatch(companyDataSlice.actions.companyDataFetchingError(e.message));
  }
};
