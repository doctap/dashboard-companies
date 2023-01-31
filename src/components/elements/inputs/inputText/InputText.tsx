import React, { type ChangeEvent } from 'react';
import styles from './InputText.module.scss';

interface IInputText {
  value: string
  getValue: (e: ChangeEvent<HTMLInputElement>) => void
  disabled: boolean
}

export const InputText = (props: IInputText) => {
  return (
    <input disabled={props.disabled} value={props.value} onChange={props.getValue} className={styles.inputText} type="text" />
  );
};
