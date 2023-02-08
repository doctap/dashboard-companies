import {
  DELETE_COMPANY_SERVER,
  GET_COMPANIES_SERVER, GET_COMPANY_DATA_BY_ID_SERVER,
  type IOwnershipsServe,
  POST_REQUEST_CHP, POST_REQUEST_FIZ, POST_REQUEST_TOO_IP,
  type IFormResponseServer,
  type ICompanyServe
} from '../../mybuh';
import { companySlice } from '../../redux/reducers/CompanySlice';
import type { AppDispatch } from '../../redux/store/store';
import { base64 as building } from '../../images/building/base64';
import type { ICompany, ICompanyResponse, ICompanyData, IBodyTooIP, IBodyCHP, IBodyFIZ, IBodyUL } from '../data-contracts/data-contracts';
import { companyDataSlice } from '../../redux/reducers/CompanyDataSlice';
import { ownerships } from '../../mybuh/ownerships';
import { companies } from '../../mybuh/companies';

export const validatorCompany = (comp: ICompanyResponse[]) => {
  const companyRes = comp.filter(v => v.shortName !== null);
  const result = companyRes.map<ICompany>(v => {
    return {
      id: v.id,
      logo: v.logo ?? `data:image/png;base64, ${building}`,
      shortName: v.shortName,
      company_name: v.company_name,
      company_tin: v.company_tin
    };
  });
  return result;
};

const validatorCompanyData = (data: IFormResponseServer): ICompanyData => {
  if (data.accountType === null || data.taxTypes === null || data.ownershipTypes === null) throw new Error('Not Found');
 
  return {
    accountType: data.accountType,
    codeOwnShips: data.codeOwnShips,
    companyName: data.companyName,
    companyTin: data.companyTin,
    taxTypes: data.taxTypes,
    short: data.shortName,
    ownershipTypes: data.ownershipTypes,
    codeTax: data.codeTax
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

export const sendFormTooIP = (body: IBodyTooIP) => {
  try {
    POST_REQUEST_TOO_IP(body);
  } catch (e: any) {
    // сообщить клиенту ошибку
  }
};

export const sendFormLegalEntity = (body: IBodyUL) => {
  try {
    console.log('sendFormLegalEntity');
  } catch (e: any) {
    // сообщить клиенту ошибку
  }
};

export const sendFormPrivatePractice = (body: IBodyCHP) => {
  try {
    POST_REQUEST_CHP(body);
  } catch (e: any) {
    // сообщить клиенту ошибку
  }
};

export const sendFormNewOrganization = (body: IBodyFIZ) => {
  try {
    POST_REQUEST_FIZ(body);
  } catch (e: any) {

    // сообщить клиенту ошибку
  }
};

export const getLogList = (myCompanies: ICompany[]) => {
  const getOwnershipCode = (companyId: number) => {
    const findingCompany = companies.find(v => v.company_id === companyId) as ICompanyServe;
    const findingOwnShip = ownerships.find(v => v.id === findingCompany.form_id) as IOwnershipsServe;

    return {
      company: findingCompany,
      ownership: findingOwnShip
    };
  };

  const res = myCompanies.map(v => ({
    companyName: getOwnershipCode(v.id).company.company_name,
    companyTin: getOwnershipCode(v.id).company.company_tin,
    ownerShipCode: getOwnershipCode(v.id).ownership.code
  }));

  console.log(res);
};
