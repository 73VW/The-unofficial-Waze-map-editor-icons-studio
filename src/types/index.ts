export type SizeOption = string;

export type Lang = 'en' | 'fr';

export interface AppState {
  icons: string[];
  filtered: string[];
  selected: string;
  size: SizeOption;
  lang: Lang;
  utilities: string[];
  filteredUtilities: string[];
  sizes: string[];
  iconColor: string;
  selectedUtility: string;
  utilityPalette: string[];
}

export interface UtilityClass {
  name: string;
  category?: string;
}

export interface ColorPreset {
  name: string;
  value: string;
  label: string;
}
