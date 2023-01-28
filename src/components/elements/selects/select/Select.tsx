import React, { type MouseEvent, useState } from 'react';
import type { SelectOption } from '../../../../types';
import { IconButton } from '../../buttons/iconButton/IconButton';
import styles from './Select.module.scss';

interface ISelect {
  options: SelectOption[]
  onSelectOption: (v: string) => void
}

export const Select = (props: ISelect) => {
  const [toggleList, setToggleList] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(props.options[0].label);

  function switchList () {
    setToggleList(!toggleList);
  }

  const getValue = (e: MouseEvent<HTMLButtonElement>, label: string) => {
    e.preventDefault();
    e.stopPropagation();

    const el = e.currentTarget;
    setSelectedLabel(label);
    
    props.onSelectOption(el.value);
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
              value={v.value}
              onClick={e => { getValue(e, v.label); }}
            >
              {v.label}
            </button>
          ))
        }
      </div>
    </div>
  );
};
