import { useTranslation } from 'react-i18next';
import { useLayoutEffect, useState } from 'react';

const AVAILABLE_LANGUAGES = ['en', 'ru'];
if (process.env.NODE_ENV !== 'production') {
  AVAILABLE_LANGUAGES.push('dev');
}

const useLanguage = () => {
  const { i18n } = useTranslation();
  const { resolvedLanguage, changeLanguage } = i18n;
  const [language, setLanguage] = useState(resolvedLanguage);

  useLayoutEffect(() => {
    changeLanguage(language);
  }, [language, changeLanguage]);

  return {
    language,
    availableLanguages: AVAILABLE_LANGUAGES,
    setLanguage,
  };
};

export default useLanguage;
