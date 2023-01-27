import React from 'react';
import type { HEX, Icon } from '../../../../types';
import styles from './IconButton.module.scss';

interface IIconButton {
  model: Icon
  onClick: () => void
  color: HEX
}

export const IconButton = (props: IIconButton) => {
  return (
    <button
      style={{ color: props.color }}
      className={styles.iconButton}
      onClick={props.onClick}
    >
      {props.model}
    </button>
  );
};
