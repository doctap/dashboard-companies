import type { AccountType } from '../../../api';
import type { BusinessType } from '../../../types';
import { type IRadio } from '../../elements';

export const radioItems: [IRadio, IRadio, IRadio] = [
  { label: 'Юридические лица', value: '1' },
  { label: 'Частная практика', value: '2' },
  { label: 'Физические лица', value: '3' }
];

export const collection = new Map <AccountType, BusinessType>([
  ['too', 'ТОО'],
  ['ip', 'ИП'],
  ['fiz', 'Прочие'],
  ['chp', 'Прочие']
]);
