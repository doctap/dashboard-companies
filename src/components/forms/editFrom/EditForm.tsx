import React, { useState } from 'react';
import type { AccountType, IBodyUL, IBodyFIZ, IBodyCHP, IBodyTooIP, ICompanyData, IData } from '../../../api';
import type { BusinessType, CodeOwnShips, TaxCode } from '../../../types';
import { MarginContainer } from '../../containers';
import {
  BtnVariants,
  Button,
  InputState,
  InputText,
  Label,
  Indicator,
  RadioCheckBox,
  Select
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
  
  const companyData = props.companyData.companyData;
  const t = companyData.accountType;
  
  const [companyTin, setCompanyTin] = useState(companyData.companyTin);
  const [companyName, setCompanyName] = useState(companyData.companyName);
  const [ownership, setOwnership] = useState(companyData.codeOwnShips);
  const [tax, setTax] = useState(companyData.codeTax);

  const onChangeTin = (e: React.ChangeEvent<HTMLInputElement>) => { setCompanyTin(e.currentTarget.value); };
  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => { setCompanyName(e.currentTarget.value); };

  const onSelectOwnShip = (v: CodeOwnShips) => { setOwnership(v); };
  const onSelectTax = (v: TaxCode) => { setTax(v); };

  const getDefaultItem = <TCode, TFull>(a: Array<{
    full: TFull
    code: TCode
  }>, c: TCode) => {
    return a.find(v => v.code === c) as { full: TFull, code: TCode };
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>, k: AccountType) => {
    e.preventDefault();
    e.stopPropagation();

    switch (k) {
      case 'too': props.onSubmitTooIP({ companyId: props.idCompany, tax });
        break;
      case 'ip': props.onSubmitTooIP({ companyId: props.idCompany, tax });
        break;
      case 'chp': props.onSubmitFormPrivatePractice({ ownership, companyId: props.idCompany, companyTin, companyName });
        break;
      case 'fiz': props.onSubmitFormNewOrganization({ companyId: props.idCompany, companyName, companyTin });
        break;
      default: props.onSubmitFormLegalEntity({ companyId: props.idCompany, companyName, companyTin, ownership, tax });
        break;
    }
  };
  
  if (props.companyData.isLoadingData) return <h1 className={styles.Loading}>Loading...</h1>;
  
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

      {(t !== 'too' && t !== 'ip')
        ? <div className={styles.RadioCheckBox}>
          <RadioCheckBox
            checked={t}
            radio={radioItems}
          />
        </div>
        : null}

      {(t !== 'too' && t !== 'ip')
        ? <MarginContainer marginBottom='.8rem'>
          <Label text='Выберите форму собственности' />
          <Select
            default={
              getDefaultItem<CodeOwnShips, string>(
                companyData.ownershipTypes, companyData.codeOwnShips
              ).full
            }
            options={companyData.ownershipTypes}
            onSelectOption={onSelectOwnShip}
          />
        </MarginContainer>
        : null}
   
      {(t !== 'chp' && t !== 'fiz')
        ? <MarginContainer marginBottom='.8rem'>
          <Label text='Выберите систему налогообложения' />
          <Select
            default={
              getDefaultItem<TaxCode, string>(
                companyData.taxTypes, companyData.codeTax
              ).full
            }
            options={companyData.taxTypes}
            onSelectOption={onSelectTax}
          />
        </MarginContainer>
        : null}
    
      <MarginContainer marginBottom='.8rem'>
        <Label text='Введите ИИН/БИН' />
        <InputText disabled={t !== 'chp' && t !== 'fiz'} value={companyTin} getValue={onChangeTin} />
      </MarginContainer>

      <MarginContainer marginBottom='1.7rem'>
        <Label text='Введите название компании' />
        <InputState
          disabled={t !== 'chp' && t !== 'fiz'}
          state={companyData.short}
          value={companyName}
          getValue={onChangeName}
        />
      </MarginContainer>

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
