import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import resources from './locales';

const defaultLanguage = 'ru';
const baseI18NextConfig = {
  debug: process.env.NODE_ENV === 'development',
  resources,
};

export const AVAILABLE_LANGUAGES = ['en', 'ru'];

export const initI18next = async () => {
  if (process.env.REACT_APP_NODE_ENV === 'test') {
    await i18next
      .use(initReactI18next)
      .init({ ...baseI18NextConfig, lng: defaultLanguage });

    return;
  }

  await i18next
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({ ...baseI18NextConfig, fallbackLng: defaultLanguage });
};
