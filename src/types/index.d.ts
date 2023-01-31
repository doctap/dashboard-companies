type Icon = 'edit_square' | 'delete' | 'close' | 'expand_more';

type HEX = `#${string}`;

type BusinessType = 'ТОО' | 'ИП' | 'Прочие';

type TaxCode = 'roz' | 'pat' | 'fiz' | 'chp' | 'sp' | 'kx' | 'our' | 'usn' | 'fix';

type CodeOwnShips = 'too' | 'else_jur' | 'pt' | 'kt' | 'tdo' | 'ao' | 'prz' | 'uch' | 'oo' | 'ptr' | 'ro' | 'fnd' | 'oul' | 'ip' | 'chp' | 'not' | 'sud' | 'adv' | 'med' | 'fiz' | 'chk' ;

type ShortName = 'ТОО' | 'Прочие юр. лица' | 'ПТ' | 'КТ' | 'ТДО' | 'АО' | 'ПК' | 'Учреждение' | 'ОО' | 'РО' | 'Фонд' | 'ОЮЛ' | 'ИП' | 'ЧП' | 'ЧН' | 'ЧСИ' | 'Адвокат' | 'ПМ' | 'ФЛ' | 'ЧК' ;

interface SelectOption {
  value: string
  label: string
}

type marginBottomType = `${string}rem` | `${string}%` | `${string}em` | `${string}px`;

export type { ShortName, Icon, HEX, BusinessType, SelectOption, marginBottomType, TaxCode, CodeOwnShips };
