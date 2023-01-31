import React, { type MouseEvent, useState } from 'react';
import { IconButton } from '../../buttons/iconButton/IconButton';
import styles from './Select.module.scss';

interface ISelect<TCode> {
  options: Array<{
    full: string
    code: TCode
  }>
  onSelectOption: (v: TCode) => void
}

export function Select <TCode> (props: ISelect<TCode>) {
  const [toggleList, setToggleList] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(props.options[0].full);
  
  function switchList () {
    setToggleList(!toggleList);
  }

  const getValue = (e: MouseEvent<HTMLButtonElement>, code: TCode) => {
    e.preventDefault();
    e.stopPropagation();

    setSelectedLabel(e.currentTarget.value);
    
    props.onSelectOption(code);
    setToggleList(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.value}>
          <div className={styles.selected}>
            {selectedLabel}
          </div>
        </div>
        <div className={styles.BtnToggleList}>
          <IconButton color='#005DA1' model='expand_more' onClick={switchList} />
        </div>
      </div>
      <div className={toggleList ? styles.showList : styles.hideList}>
        {
          props.options.map((v, i) => (
            <button
              className={styles.option}
              key={i}
              value={v.full}
              onClick={e => { getValue(e, v.code); }}
            >
              {v.full}
            </button>
          ))
        }
      </div>
    </div>
  );
}
