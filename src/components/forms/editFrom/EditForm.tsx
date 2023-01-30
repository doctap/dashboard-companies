import React, { useState } from 'react';
import type { AccountType, ICompanyData, IData } from '../../../api';
import type { BusinessType } from '../../../types';
import { InputContainer } from '../../containers';
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
import { collection, optionsOwnShips, optionsTax, radioItems } from './items';

interface IEditForm {
  idCompany: number
  business: BusinessType[]
  onSubmit: () => void
  companyData: IData<ICompanyData>
}

export const EditForm = (props: IEditForm) => {
  const getBusinessType = (str: AccountType) => {
    return collection.get(str) as BusinessType;
  };

  let ownShip = '';
  let tax = '';

  const companyData = props.companyData.companyData;
  const isOrganization = getBusinessType(companyData.accountType) === 'Прочие';
  const [newOrganization, setNewOrganization] = useState(false);

  const [privatePractice, setPrivatePractice] = useState(true);
  const [companyTin, setCompanyTin] = useState(companyData.companyTin);
  const [companyName, setCompanyName] = useState(companyData.companyName);

  const onChangeTin = (e: React.ChangeEvent<HTMLInputElement>) => { setCompanyTin(e.currentTarget.value); };
  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => { setCompanyName(e.currentTarget.value); };

  const onSelectOwnShip = (v: string) => { ownShip = v; };
  const onSelectTax = (v: string) => { tax = v; };

  const switchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    if (value === 'частная-практика') {
      setNewOrganization(false);
      setPrivatePractice(false);
    } else if (value === 'юридические-лица') {
      setNewOrganization(false);
      setPrivatePractice(true);
    } else if (value === 'физические-лица') {
      setNewOrganization(true);
    }
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  if (props.companyData.isLoadingData) return <h1>Loading...</h1>;
  console.log(ownShip, tax);
  return (
    <FormContainer onSubmit={submitForm}>

      <div className={styles.title}>
        {newOrganization ? 'Новая организация' : 'Редактировать данные организации'}
      </div>

      <div className={styles.RadioButton}>
        <Indicator
          defaultValue={getBusinessType(companyData.accountType)}
          businessTypes={props.business}
        />
      </div>

      {
        isOrganization
          ? <div className={styles.RadioCheckBox}>
            <RadioCheckBox
              checked='юридические-лица'
              onChange={e => { switchInput(e); }}
              radio={radioItems}
            />
          </div>
          : null
      }

      {
        newOrganization
          ? null
          : <>
            {
              !isOrganization
                ? null
                : <InputContainer marginBottom='.8rem'>
                  <Label text='Выберите форму собственности' />
                  <Select
                    options={optionsOwnShips}
                    onSelectOption={onSelectOwnShip}
                  />
                </InputContainer>
            }
            {
              privatePractice
                ? <InputContainer marginBottom='.8rem'>
                  <Label text='Выберите систему налогообложения' />
                  <Select
                    options={optionsTax}
                    onSelectOption={onSelectTax}
                  />
                </InputContainer>
                : null
            }
          </>
      }

      <InputContainer marginBottom='.8rem'>
        <Label text='Введите ИИН/БИН' />
        <InputText value={companyTin} getValue={onChangeTin} />
      </InputContainer>

      <InputContainer marginBottom='1.7rem'>
        <Label text='Введите название компании' />
        <InputState
          typeBusiness={getBusinessType(companyData.accountType)}
          value={companyName}
          getValue={onChangeName}
        />
      </InputContainer>

      <div className={newOrganization ? `${styles.bottom} ${styles.bottom_position}` : `${styles.bottom}`}>
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
