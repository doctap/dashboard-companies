import React from 'react';
import type { marginBottomType } from '../../../types';
import styles from './InputContainer.module.scss';

interface IInputContainer {
  children: React.ReactNode
  marginBottom?: marginBottomType
}

export const InputContainer = (props: IInputContainer) => {
  return (
    <div style={{ marginBottom: props.marginBottom ?? '1rem' }} className={styles.inputContainer}>
      {props.children}
    </div>
  );
};
