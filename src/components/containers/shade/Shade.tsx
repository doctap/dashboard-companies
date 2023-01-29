import React from 'react';
import styles from './Shade.module.scss';

interface IShade {
  children: React.ReactNode
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void
}

export const Shade = (props: IShade) => {
  return (
    <div onClick={props.onClick} className={styles.shade}>
      {props.children}
    </div>
  );
};
