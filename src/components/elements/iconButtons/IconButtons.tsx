import React from 'react';
import type { HEX, Icon } from '../../../types';
import { IconButton } from '../buttons/iconButton/IconButton';

export interface IIconButtons {
  color1: HEX
  model1: Icon
  onClick1: () => void
  color2: HEX
  model2: Icon
  onClick2: () => void
}

export const IconButtons = (props: IIconButtons) => {
  return (
    <>
      <IconButton color={props.color1} model={props.model1} onClick={props.onClick1} />
      <IconButton color={props.color2} model={props.model2} onClick={props.onClick2} />
    </>
  );
};
