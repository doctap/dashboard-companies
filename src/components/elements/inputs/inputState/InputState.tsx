import React, { type ChangeEvent } from 'react';
import type { ShortName } from '../../../../types';
import styles from './InputState.module.scss';

interface IInputState {
  state: ShortName
  getValue: (e: ChangeEvent<HTMLInputElement>) => void
  value: string
  disabled: boolean
}

export const InputState = (props: IInputState) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.state}>
        {props.state}
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
