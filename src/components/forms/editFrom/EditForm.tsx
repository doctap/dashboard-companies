import React, { useState } from 'react';
import type { AccountType, IBodyUL, IBodyFIZ, IBodyCHP, IBodyTooIP, ICompanyData, IData } from '../../../api';
import type { BusinessType, CodeOwnShips, TaxCode } from '../../../types';
import { InputContainer } from '../../containers';
import {
  BtnVariants,
  Button,
  InputState,
  InputText,
  Label,
  Indicator,
  RadioCheckBox,
  Select,
  type Variants
} from '../../elements';
import { FormContainer } from '../index';
import styles from './EditForm.module.scss';
import { collection, radioItems } from './items';

interface IEditForm {
  idCompany: number
  business: BusinessType[]
  onSubmitTooIP: (body: IBodyTooIP) => void
  onSubmitFormLegalEntity: (body: IBodyUL) => void
  onSubmitFormPrivatePractice: (body: IBodyCHP) => void
  onSubmitFormNewOrganization: (body: IBodyFIZ) => void
  companyData: IData<ICompanyData>
}

export const EditForm = (props: IEditForm) => {
  const getBusinessType = (str: AccountType) => {
    return collection.get(str) as BusinessType;
  };
  
  let ownShip = '';
  let tax = '';
  
  const companyData = props.companyData.companyData;
  const t = companyData.accountType;
  
  const [companyTin, setCompanyTin] = useState(companyData.companyTin);
  const [companyName, setCompanyName] = useState(companyData.companyName);

  const onChangeTin = (e: React.ChangeEvent<HTMLInputElement>) => { setCompanyTin(e.currentTarget.value); };
  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => { setCompanyName(e.currentTarget.value); };

  const onSelectOwnShip = (v: CodeOwnShips) => { ownShip = v; };
  const onSelectTax = (v: TaxCode) => { tax = v; };

  const switchType = (): Variants => {
    return companyData.accountType === 'fiz' ? '3' : companyData.accountType === 'chp' ? '2' : '1';
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>, k: AccountType) => {
    e.preventDefault();
    e.stopPropagation();

    switch (k) {
      case 'too': props.onSubmitTooIP({ companyId: props.idCompany, tax });
        break;
      case 'ip': props.onSubmitTooIP({ companyId: props.idCompany, tax });
        break;
      case 'chp': props.onSubmitFormPrivatePractice({ ownership: ownShip, companyId: props.idCompany, companyTin, companyName });
        break;
      case 'fiz': props.onSubmitFormNewOrganization({ companyId: props.idCompany, companyName, companyTin });
        break;
      default: props.onSubmitFormLegalEntity({ companyId: props.idCompany, companyName, companyTin, ownership: ownShip, tax });
        break;
    }
  };
  
  if (props.companyData.isLoadingData) return <h1>Loading...</h1>;

  return (
    <FormContainer onSubmit={(e) => { submitForm(e, t); }}>

      <div className={styles.title}>
        { t === 'fiz' ? 'Новая организация' : 'Редактировать данные организации'}
      </div>

      <div className={styles.RadioButton}>
        <Indicator
          defaultValue={getBusinessType(companyData.accountType)}
          businessTypes={props.business}
        />
      </div>

      {(switchType() !== '1')
        ? <div className={styles.RadioCheckBox}>
          <RadioCheckBox
            checked={switchType()}
            radio={radioItems}
          />
        </div>
        : null}

      {(switchType() !== '1')
        ? <InputContainer marginBottom='.8rem'>
          <Label text='Выберите форму собственности' />
          <Select
            options={companyData.ownershipTypes}
            onSelectOption={onSelectOwnShip}
          />
        </InputContainer>
        : null}
     
      {(switchType() === '1')
        ? <InputContainer marginBottom='.8rem'>
          <Label text='Выберите систему налогообложения' />
          <Select
            options={companyData.taxTypes}
            onSelectOption={onSelectTax}
          />
        </InputContainer>
        : null}
      
      <InputContainer marginBottom='.8rem'>
        <Label text='Введите ИИН/БИН' />
        <InputText disabled={switchType() === '1'} value={companyTin} getValue={onChangeTin} />
      </InputContainer>

      <InputContainer marginBottom='1.7rem'>
        <Label text='Введите название компании' />
        <InputState
          disabled={switchType() === '1'}
          state={companyData.accountType}
          value={companyName}
          getValue={onChangeName}
        />
      </InputContainer>

      <div className={t === 'fiz' ? `${styles.bottom} ${styles.bottom_position}` : `${styles.bottom}`}>
        <div className={styles.submitButton}>
          <Button
            name='save'
            text='Сохранить'
            onClick={() => 0}
            type='submit'
            variant={BtnVariants.Primary_model2}
          />
        </div>
      </div>

    </FormContainer>
  );
};
