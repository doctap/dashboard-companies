import React from 'react';
import styles from './ImageCard.module.scss';

interface IImageCard {
  src: string
  alt: string
}

export const ImageCard = (props: IImageCard) => {
  return (
    <img className={styles.image} src={props.src} alt={props.alt} />
  );
};
