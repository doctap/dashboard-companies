import React from 'react';
import type { marginBottomType } from '../../../types';
import styles from './MarginContainer.module.scss';

interface IMarginContainer {
  children: React.ReactNode
  marginBottom?: marginBottomType
}

export const MarginContainer = (props: IMarginContainer) => {
  return (
    <div style={{ marginBottom: props.marginBottom ?? '1rem' }} className={styles.inputContainer}>
      {props.children}
    </div>
  );
};
