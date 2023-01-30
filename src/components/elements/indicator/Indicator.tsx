import React, { useState } from 'react';
import type { BusinessType } from '../../../types';
import styles from './Indicator.module.scss';

interface IIndicator {
  defaultValue: BusinessType
  businessTypes: BusinessType[]
}

export const Indicator = (props: IIndicator) => {
  const [value] = useState(props.defaultValue);
  return (
    <div className={styles.radioButton}>

      {
        props.businessTypes.map(v => (
          <div
            key={v}
            className={value === v ? `${styles.type} ${styles.type_selected}` : `${styles.type}`}
          >
            {v}
          </div>
        ))
      }
    </div>
  );
};
