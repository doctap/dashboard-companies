import React, { useState } from 'react';
import styles from './RadioCheckBox.module.scss';

interface IRadioCheckBox {
  checked: Variants
  radio: [IRadio, IRadio, IRadio]
}

export interface IRadio {
  label: string
  value: Variants
}

export type Variants = '1' | '2' | '3';

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
