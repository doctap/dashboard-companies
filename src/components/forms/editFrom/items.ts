import type { AccountType } from '../../../api';
import type { BusinessType, SelectOption } from '../../../types';

export const optionsTax: SelectOption[] = [
  { value: 'упрощенная-система-налогообложения', label: 'Упрощенная система налогообложения' },
  { value: 'допустим-пункт-1', label: 'допустим пункт 1' },
  { value: 'допустим-пункт-2', label: 'допустим пункт 2' },
  { value: 'допустим-пункт-3', label: 'допустим пункт 3' },
  { value: 'допустим-пункт-4', label: 'допустим пункт 4' }
];

export const optionsOwnShips: SelectOption[] = [
  { value: 'акционерное-общество', label: 'Акционерное общество' },
  { value: 'допустим-пункт-1', label: 'допустим пункт 1' },
  { value: 'допустим-пункт-2', label: 'допустим пункт 2' },
  { value: 'допустим-пункт-3', label: 'допустим пункт 3' },
  { value: 'допустим-пункт-4', label: 'допустим пункт 4' }
];

export const radioItems: SelectOption[] = [
  { label: 'Юридические лица', value: 'юридические-лица' },
  { label: 'Частная практика', value: 'частная-практика' },
  { label: 'Физические лица', value: 'физические-лица' }
];

export const collection = new Map <AccountType, BusinessType>([
  ['too', 'ТОО'],
  ['ip', 'ИП'],
  ['fiz', 'Прочие'],
  ['chp', 'Прочие']
]);
