type Icon = 'edit_square' | 'delete' | 'close' | 'expand_more';

type HEX = `#${string}`;

type BusinessType = 'ТОО' | 'ИП' | 'Прочие';

interface SelectOption {
  value: string
  label: string
}

type marginBottomType = `${string}rem` | `${string}%` | `${string}em` | `${string}px`;

export type { Icon, HEX, BusinessType, SelectOption, marginBottomType };
