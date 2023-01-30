type Icon = 'edit_square' | 'delete' | 'close' | 'expand_more';

type HEX = `#${string}`;

type BusinessType = 'ТОО' | 'ИП' | 'Прочие';

type TaxCode = 'roz' | 'pat' | 'fiz' | 'chp' | 'sp' | 'kx' | 'our' | 'usn' | 'fix';

type CodeOwnShips = 'too' | 'else_jur' | 'pt' | 'kt' | 'tdo' | 'ao' | 'prz' | 'uch' | 'oo' | 'ptr' | 'ro' | 'fnd' | 'oul' | 'ip' | 'chp' | 'not' | 'sud' | 'adv' | 'med' | 'fiz' | 'chk' ;

interface SelectOption {
  value: string
  label: string
}

type marginBottomType = `${string}rem` | `${string}%` | `${string}em` | `${string}px`;

export type { Icon, HEX, BusinessType, SelectOption, marginBottomType, TaxCode, CodeOwnShips };
