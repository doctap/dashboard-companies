import React from 'react';
import styles from './Label.module.scss';

interface ILabel {
  text: string
}

export const Label = (props: ILabel) => {
  return (
    <label className={styles.label}>
      {props.text}
    </label>
  );
};
