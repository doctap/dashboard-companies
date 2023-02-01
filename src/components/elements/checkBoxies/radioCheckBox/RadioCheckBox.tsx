import React from 'react';
import type { AccountType } from '../../../../api';
import styles from './RadioCheckBox.module.scss';

interface IRadioCheckBox {
  checked: AccountType
  radio: [IRadio, IRadio, IRadio]
}

export interface IRadio {
  label: string
  value: AccountType
}

export const RadioCheckBox = (props: IRadioCheckBox) => {
  return (
    <>
      {
        props.radio.map(v => (
          <div key={v.value}>
            <input
              checked={v.value === props.checked}
              className={styles.radioCheckBox}
              onChange={() => 0}
              name="color"
              type="radio"
              id={v.value}
              value={v.value}
            />
            <label htmlFor={v.value}>
              {v.label}
            </label>
          </div>
        ))
      }
    </>
  );
};
