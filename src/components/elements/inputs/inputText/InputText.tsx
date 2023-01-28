import React, { type ChangeEvent } from 'react';
import styles from './InputText.module.scss';

interface IInputText {
  getValue: (e: ChangeEvent<HTMLInputElement>) => void
}

export const InputText = (props: IInputText) => {
  return (
    <input onChange={props.getValue} className={styles.inputText} type="text" />
  );
};
