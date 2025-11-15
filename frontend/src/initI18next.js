import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import resources from './locales';

const defaultLanguage = localStorage.getItem('language') || 'ru';
const baseI18NextConfig = {
  debug: import.meta.env.MODE === 'development',
  resources,
};

export const AVAILABLE_LANGUAGES = ['en', 'ru'];

export const initI18next = async () => {
  if (import.meta.env.MODE === 'test') {
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
