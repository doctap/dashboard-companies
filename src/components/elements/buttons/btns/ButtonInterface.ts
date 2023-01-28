import type { MouseEvent } from 'react';

export enum BtnVariants {
  Primary = 1,
  Primary_model1 = 2,
  Primary_model2 = 3,
  Primary_model3 = 4,
  Border = 5,
  BtnText = 6,
  Submit = 7,
}

export interface IButtonProps<TName extends string> {
  text: string
  name: TName
  type: 'button' | 'reset' | 'submit'
  variant: BtnVariants
  disabled?: boolean
  onClick: (e: MouseEvent<HTMLButtonElement>) => void
}
