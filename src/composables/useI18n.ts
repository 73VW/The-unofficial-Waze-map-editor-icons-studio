import { ref, computed } from 'vue';
import type { Lang } from '../types';
import enLocale from '../../locales/en.json';
import frLocale from '../../locales/fr.json';

const currentLang = ref<Lang>('en');

const translations: Record<Lang, Record<string, string>> = {
  en: enLocale,
  fr: frLocale,
};

export const flagForLang: Record<Lang, string> = {
  en: 'fi fi-gb',
  fr: 'fi fi-fr',
};

export function useI18n() {
  const lang = computed(() => currentLang.value);

  const t = (key: string, options?: Record<string, unknown>): string => {
    let text = translations[currentLang.value]?.[key] || translations.en[key] || key;

    if (options) {
      Object.entries(options).forEach(([k, v]) => {
        text = text.replace(new RegExp(`{{${k}}}`, 'g'), String(v));
      });
    }

    return text;
  };

  const setLang = (newLang: Lang) => {
    currentLang.value = newLang;
  };

  const initLang = () => {
    const browserLang = (navigator.language || 'en').slice(0, 2).toLowerCase();
    currentLang.value = browserLang === 'fr' ? 'fr' : 'en';
  };

  return {
    lang,
    t,
    setLang,
    initLang,
  };
}
