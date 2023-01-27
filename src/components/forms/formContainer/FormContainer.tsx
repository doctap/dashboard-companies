import React from 'react';
import styles from './FormContainer.module.scss';

interface IFormContainer {
  children: React.ReactNode
}

export const FormContainer = (props: IFormContainer) => {
  return (
    <form className={styles.formContainer}>
      {props.children}
    </form>
  );
};
