export enum BtnVariants {
  Primary = 1,
  Primary_model1 = 2,
  Primary_model2 = 3,
  Primary_model3 = 4,
  Border = 5,
  BtnText = 6,
  Submit = 7,
}

export interface IButtonProps {
  name: string
  type: 'button' | 'reset' | 'submit'
  variant: BtnVariants
  disabled?: boolean
  onClick?: () => void
}
