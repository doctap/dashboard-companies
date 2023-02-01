import type { AccountType } from '../../../api';
import type { BusinessType } from '../../../types';
import { type IRadio } from '../../elements';

export const radioItems: [IRadio, IRadio, IRadio] = [
  // { label: 'Юридические лица', value: 'ip' <--- неверный тип аккаунта!! Сделано на будущее, когда появится
  // обозначение для подтипа "Юридические лица" },
  { label: 'Юридические лица', value: 'ip' },
  { label: 'Частная практика', value: 'chp' },
  { label: 'Физические лица', value: 'fiz' }
];

export const collection = new Map <AccountType, BusinessType>([
  ['too', 'ТОО'],
  ['ip', 'ИП'],
  ['fiz', 'Прочие'],
  ['chp', 'Прочие']
]);
