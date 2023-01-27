import { requestCompany } from '../../mybuh';
import { companySlice } from '../../redux/reducers/CompanySlice';
import type { AppDispatch } from '../../redux/store/store';
import { base64 as building } from '../../images/building/base64';

/**
 * for EXAMPLE
 * @param comp companies[]
 * @returns valid companies[]
 */
export const validatorCompany = (comp: any[]) => {
  const result = comp.filter(v => v.account_type !== null);
  result.forEach(v => {
    if (v.logo === null) v.logo = `data:image/png;base64, ${building}`;
  });
  return result;
};

export const fetchCompanies = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(companySlice.actions.companiesFetching());
    const res = validatorCompany(requestCompany());
    dispatch(companySlice.actions.companiesFetchingSuccess(res));
  } catch (e: any) {
    dispatch(companySlice.actions.companiesFetchingError(e.message));
  }
};
