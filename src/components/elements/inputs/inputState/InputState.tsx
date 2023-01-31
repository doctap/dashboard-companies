import React, { type ChangeEvent } from 'react';
import { type AccountType } from '../../../../api';
import styles from './InputState.module.scss';

interface IInputState {
  state: AccountType
  getValue: (e: ChangeEvent<HTMLInputElement>) => void
  value: string
  disabled: boolean
}

const abbr = {
  too: 'ТОО',
  ip: 'ИП',
  chp: 'ЮЛ',
  fiz: 'ФЛ',
  ul: 'ЮЛ'
};

export const InputState = (props: IInputState) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.state}>
        {abbr[props.state]}
      </div>
      <input
        disabled={props.disabled}
        value={props.value}
        className={styles.inputState}
        type='text'
        onChange={props.getValue}
      />
    </div>
  );
};
