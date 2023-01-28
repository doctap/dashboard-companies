import React from 'react';
import styles from './Button.module.scss';
import { BtnVariants, type IButtonProps } from './ButtonInterface';

export function Button <N extends string> (props: IButtonProps<N>) {
  const variantBtn = (v: BtnVariants) => {
    switch (v) {
      case BtnVariants.Border: return styles.btnBorder;

      case BtnVariants.Primary: return styles.btnPrimary;

      case BtnVariants.Primary_model1: return `${styles.btnPrimary} ${styles.btnPrimary_model1}`;

      case BtnVariants.Primary_model2: return `${styles.btnPrimary} ${styles.btnPrimary_model2}`;

      case BtnVariants.Primary_model3: return `${styles.btnPrimary} ${styles.btnPrimary_model3}`;

      case BtnVariants.BtnText: return styles.btnText;

      default:
        break;
    }
  };

  return (
    <button
      onClick={(e) => { props.onClick(e); }}
      type={props.type}
      className={variantBtn(props.variant)}
      disabled={props.disabled}
      name={props.name}
    >
      {props.text}
    </button>
  );
}
