
export type LanguageOption = {
  code: string
  name: string
  englishName?: string

  /**
   * A date format string for use by the date selectors. MUST contain 'yyyy', 'mm' and 'dd'.
   */
  dateInputFormat?: string
}

export const LANGUAGE_OPTIONS = [
  {
    code: 'en-us',
    name: $localize`English (US)`,
    englishName: 'English (US)',
    dateInputFormat: 'mm/dd/yyyy',
  },
  {
    code: 'af-za',
    name: $localize`Afrikaans`,
    englishName: 'Afrikaans',
    dateInputFormat: 'yyyy-mm-dd',
  },
  {
    code: 'ar-ar',
    name: $localize`Arabic`,
    englishName: 'Arabic',
    dateInputFormat: 'yyyy-mm-dd',
  },
  {
    code: 'be-by',
    name: $localize`Belarusian`,
    englishName: 'Belarusian',
    dateInputFormat: 'dd.mm.yyyy',
  },
  {
    code: 'bg-bg',
    name: $localize`Bulgarian`,
    englishName: 'Bulgarian',
    dateInputFormat: 'dd.mm.yyyy',
  },
  {
    code: 'ca-es',
    name: $localize`Catalan`,
    englishName: 'Catalan',
    dateInputFormat: 'dd/mm/yyyy',
  },
  {
    code: 'cs-cz',
    name: $localize`Czech`,
    englishName: 'Czech',
    dateInputFormat: 'dd.mm.yyyy',
  },
  {
    code: 'da-dk',
    name: $localize`Danish`,
    englishName: 'Danish',
    dateInputFormat: 'dd.mm.yyyy',
  },
  {
    code: 'de-de',
    name: $localize`German`,
    englishName: 'German',
    dateInputFormat: 'dd.mm.yyyy',
  },
  {
    code: 'el-gr',
    name: $localize`Greek`,
    englishName: 'Greek',
    dateInputFormat: 'dd/mm/yyyy',
  },
  {
    code: 'en-gb',
    name: $localize`English (GB)`,
    englishName: 'English (GB)',
    dateInputFormat: 'dd/mm/yyyy',
  },
  {
    code: 'es-es',
    name: $localize`Spanish`,
    englishName: 'Spanish',
    dateInputFormat: 'dd/mm/yyyy',
  },
  {
    code: 'fi-fi',
    name: $localize`Finnish`,
    englishName: 'Finnish',
    dateInputFormat: 'dd.mm.yyyy',
  },
  {
    code: 'fr-fr',
    name: $localize`French`,
    englishName: 'French',
    dateInputFormat: 'dd/mm/yyyy',
  },
  {
    code: 'hu-hu',
    name: $localize`Hungarian`,
    englishName: 'Hungarian',
    dateInputFormat: 'yyyy.mm.dd',
  },
  {
    code: 'id-id',
    name: $localize`Indonesian`,
    englishName: 'Indonesian',
    dateInputFormat: 'dd-mm-yyyy',
  },
  {
    code: 'it-it',
    name: $localize`Italian`,
    englishName: 'Italian',
    dateInputFormat: 'dd/mm/yyyy',
  },
  {
    code: 'ja-jp',
    name: $localize`Japanese`,
    englishName: 'Japanese',
    dateInputFormat: 'yyyy/mm/dd',
  },
  {
    code: 'ko-kr',
    name: $localize`Korean`,
    englishName: 'Korean',
    dateInputFormat: 'yyyy-mm-dd',
  },
  {
    code: 'lb-lu',
    name: $localize`Luxembourgish`,
    englishName: 'Luxembourgish',
    dateInputFormat: 'dd.mm.yyyy',
  },
  {
    code: 'nl-nl',
    name: $localize`Dutch`,
    englishName: 'Dutch',
    dateInputFormat: 'dd-mm-yyyy',
  },
  {
    code: 'no-no',
    name: $localize`Norwegian`,
    englishName: 'Norwegian',
    dateInputFormat: 'dd.mm.yyyy',
  },
  {
    code: 'fa-ir',
    name: $localize`Persian`,
    englishName: 'Persian',
    dateInputFormat: 'yyyy-mm-dd',
  },
  {
    code: 'pl-pl',
    name: $localize`Polish`,
    englishName: 'Polish',
    dateInputFormat: 'dd.mm.yyyy',
  },
  {
    code: 'pt-br',
    name: $localize`Portuguese (Brazil)`,
    englishName: 'Portuguese (Brazil)',
    dateInputFormat: 'dd/mm/yyyy',
  },
  {
    code: 'pt-pt',
    name: $localize`Portuguese`,
    englishName: 'Portuguese',
    dateInputFormat: 'dd/mm/yyyy',
  },
  {
    code: 'ro-ro',
    name: $localize`Romanian`,
    englishName: 'Romanian',
    dateInputFormat: 'dd.mm.yyyy',
  },
  {
    code: 'ru-ru',
    name: $localize`Russian`,
    englishName: 'Russian',
    dateInputFormat: 'dd.mm.yyyy',
  },
  {
    code: 'sk-sk',
    name: $localize`Slovak`,
    englishName: 'Slovak',
    dateInputFormat: 'dd.mm.yyyy',
  },
  {
    code: 'sl-si',
    name: $localize`Slovenian`,
    englishName: 'Slovenian',
    dateInputFormat: 'dd.mm.yyyy',
  },
  {
    code: 'sr-cs',
    name: $localize`Serbian`,
    englishName: 'Serbian',
    dateInputFormat: 'dd.mm.yyyy',
  },
  {
    code: 'sv-se',
    name: $localize`Swedish`,
    englishName: 'Swedish',
    dateInputFormat: 'yyyy-mm-dd',
  },
  {
    code: 'tr-tr',
    name: $localize`Turkish`,
    englishName: 'Turkish',
    dateInputFormat: 'yyyy-mm-dd',
  },
  {
    code: 'uk-ua',
    name: $localize`Ukrainian`,
    englishName: 'Ukrainian',
    dateInputFormat: 'dd.mm.yyyy',
  },
  {
    code: 'vi-vn',
    name: $localize`Vietnamese`,
    englishName: 'Vietnamese',
    dateInputFormat: 'dd/mm/yyyy',
  },
  {
    code: 'zh-cn',
    name: $localize`Chinese Simplified`,
    englishName: 'Chinese Simplified',
    dateInputFormat: 'yyyy-mm-dd',
  },
  {
    code: 'zh-tw',
    name: $localize`Chinese Traditional`,
    englishName: 'Chinese Traditional',
    dateInputFormat: 'yyyy/mm/dd',
  },
];

export const ISO_LANGUAGE_OPTION: LanguageOption = {
  code: 'iso-8601',
  name: $localize`ISO 8601`,
  dateInputFormat: 'yyyy-mm-dd',
};
