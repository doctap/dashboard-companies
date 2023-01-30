import React from 'react';
import styles from './RadioCheckBox.module.scss';

interface IRadioCheckBox {
  checked: string
  radio: IRadio[]
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export interface IRadio {
  label: string
  value: string
}

export const RadioCheckBox = (props: IRadioCheckBox) => {
  return (
    <>
      {
        props.radio.map(v => (
          <div key={v.value}>
            <input
              defaultChecked={v.value === props.checked}
              onChange={props.onChange}
              className={styles.radioCheckBox}
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
