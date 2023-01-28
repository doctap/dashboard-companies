import React, { type MouseEvent, useState } from 'react';
import type { BusinessType } from '../../../types';
import { Button } from '../buttons/btns/Button';
import { BtnVariants } from '../buttons/btns/ButtonInterface';
import styles from './RadioButton.module.scss';

interface IRadioButton {
  businessTypes: BusinessType[]
  onSelect: (v: BusinessType) => void
}

export const RadioButton = (props: IRadioButton) => {
  const [value, setValue] = useState(props.businessTypes[0]);

  const getValue = <TName extends BusinessType>(e: MouseEvent<HTMLButtonElement>) => {
    const el = e.currentTarget;
    setValue(el.name as TName);
    props.onSelect(el.name as TName);
  };

  return (
    <div className={styles.radioButton}>

      {
        props.businessTypes.map(v => (
          <div key={v}>
            <Button<BusinessType>
              text={v}
              name={v}
              type='button'
              variant={ value === v ? BtnVariants.Primary_model1 : BtnVariants.Primary_model3}
              onClick={getValue}
            />
          </div>
        ))
      }
      {/* <div>
        <Button<BusinessType>
          text={props.button1}
          name={props.button1}
          type='button'
          variant={ BusinessType === props.button1 ? BtnVariants.Primary_model1 : BtnVariants.Primary_model3}
          onClick={getValue}
        />
      </div>
      <div>
        <Button<BusinessType>
          text={props.button2}
          name={props.button2}
          type='button'
          variant={ BusinessType === props.button2 ? BtnVariants.Primary_model1 : BtnVariants.Primary_model3}
          onClick={getValue}
        />
      </div>
      <div>
        <Button<BusinessType>
          text={props.button3}
          name={props.button3}
          type='button'
          variant={ BusinessType === props.button3 ? BtnVariants.Primary_model1 : BtnVariants.Primary_model3}
          onClick={getValue}
        />
      </div> */}

    </div>
  );
};
