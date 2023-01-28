import React from 'react';
import type { BusinessType, SelectOption } from '../../../types';
import { InputContainer } from '../../containers/inputContainer/InputContainer';
import { Button, InputState, InputText, Label, RadioButton, Select } from '../../elements';
import { BtnVariants } from '../../elements/buttons/btns/ButtonInterface';
import { FormContainer } from '../index';
import styles from './EditForm.module.scss';

interface IEditForm {
  idSubject: number
  business: BusinessType[]
}

export const EditForm = (props: IEditForm) => {
  const options: SelectOption[] = [
    { value: 'упрощенная-система-налогообложения', label: 'Упрощенная система налогообложения' },
    { value: 'допустим-пункт-1', label: 'допустим пункт 1' },
    { value: 'допустим-пункт-2', label: 'допустим пункт 2' },
    { value: 'допустим-пункт-3', label: 'допустим пункт 3' },
    { value: 'допустим-пункт-4', label: 'допустим пункт 4' }
  ];

  const set = new Set(props.business);

  return (
    <FormContainer onSubmit={() => 0}>

      <div className={styles.title}>
        Редактировать данные организации
      </div>

      <div className={styles.RadioButton}>
        <RadioButton businessTypes={[...set]} onSelect={(v) => 0} />
      </div>

      <InputContainer marginBottom='.8rem'>
        <Label text='Выберите систему налогообложения' />
        <Select options={options} onSelectOption={(v) => { console.log(v); }} />
      </InputContainer>

      <InputContainer marginBottom='.8rem'>
        <Label text='Введите ИИН/БИН' />
        <InputText getValue={(e) => { console.log(e.currentTarget.value); }} />
      </InputContainer>

      <InputContainer marginBottom='1.7rem'>
        <Label text='Введите название компании' />
        <InputState typeBusiness='ИП' getValue={(e) => 0} />
      </InputContainer>

      <div className={styles.bottom}>
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
