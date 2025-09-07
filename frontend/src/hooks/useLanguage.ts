import { useTranslation } from 'react-i18next';
import { useEffect, useLayoutEffect, useState } from 'react';

import { AVAILABLE_LANGUAGES } from '../initI18next';

const useLanguage = () => {
  const { i18n } = useTranslation();
  const { resolvedLanguage, changeLanguage } = i18n;
  const [language, setLanguage] = useState(resolvedLanguage);

  useEffect(() => {
    setLanguage(resolvedLanguage);
  }, [setLanguage, resolvedLanguage]);

  useLayoutEffect(() => {
    changeLanguage(language);
    localStorage.setItem('language', language);
  }, [language, changeLanguage]);

  return {
    language,
    availableLanguages: AVAILABLE_LANGUAGES,
    setLanguage,
  };
};

export default useLanguage;
