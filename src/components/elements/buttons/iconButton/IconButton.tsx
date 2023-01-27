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
    // !!! тег input потому-что тег button в версиях Chrome 111.0.5545.4, 111.0.5545.4
    // либо Яндекс или Edge (фокус, при передвижении с помощью клавиатуры ведет себя странно)
    <input
      style={{ color: props.color }}
      className={styles.iconButton}
      onClick={props.onClick}
      type='button'
      value={props.model}
    />
  );
};
