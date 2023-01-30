import React from 'react';
import styles from './FormContainer.module.scss';

interface IFormContainer {
  children: React.ReactNode
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

export const FormContainer = (props: IFormContainer) => {
  return (
    <form onSubmit={props.onSubmit} className={styles.formContainer}>
      {props.children}
    </form>
  );
};
