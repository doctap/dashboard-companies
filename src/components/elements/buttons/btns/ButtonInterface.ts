export enum BtnVariants {
  Primary = 1,
  Border = 2,
  BtnText = 3,
  Submit = 4,
}

export interface IButtonProps {
  name: string
  type: 'button' | 'reset' | 'submit'
  variant: BtnVariants
  disabled?: boolean
  onClick?: () => void
}
