import React from 'react';
import styles from './Shade.module.scss';

interface IShade {
  children: React.ReactNode
}

export const Shade = (props: IShade) => {
  return (
    <div className={styles.shade}>
      {props.children}
    </div>
  );
};
