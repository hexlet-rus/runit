import { useTranslation } from 'react-i18next';
import { useEffect, useLayoutEffect, useState } from 'react';
import { AvailableLanguages } from '../types/common';
import { AVAILABLE_LANGUAGES } from '../initI18next';
import { UseLanguageReturn } from '../types/hooks';


const useLanguage = (): UseLanguageReturn => {
  const { i18n } = useTranslation();
  const { resolvedLanguage, changeLanguage } = i18n;
  const getSafeLanguage = (lang: string): AvailableLanguages => {
    return AVAILABLE_LANGUAGES.includes(lang as AvailableLanguages)
      ? (lang as AvailableLanguages)
      : AvailableLanguages.RU; // значение по умолчанию
  };

  const [language, setLanguageState] = useState<AvailableLanguages>(getSafeLanguage(resolvedLanguage))

  const setLanguage = (newLanguage: string) => {
    setLanguageState(getSafeLanguage(newLanguage));
  };

  useEffect(() => {
    setLanguage(resolvedLanguage as AvailableLanguages);
  }, [setLanguage, resolvedLanguage]);

  useLayoutEffect(() => {
    changeLanguage(language);
    try {
      localStorage.setItem('language', language);
    } catch (error) {
      console.error('Failed to save language to localStorage:', error);
    }
  }, [language, changeLanguage]);

  return {
    language,
    availableLanguages: AVAILABLE_LANGUAGES,
    setLanguage,
  };
};

export default useLanguage;
