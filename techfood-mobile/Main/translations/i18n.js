import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import {en} from './locales/en';
import {fr}  from './locales/fr';

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: cb => cb('fr'),
  init: () => {},
  cacheUserLanguage: () => {},
};


i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(languageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: 'fr',
    debug: true,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en,
      fr
    }
  });


export default i18n;