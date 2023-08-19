import { configureStore } from '@reduxjs/toolkit';
import * as Sentry from '@sentry/react';
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import AppRoutes from './AppRoutes.jsx';
import ModalWindow from './components/Modals';
import resources from './locales';
import AuthProvider from './providers/AuthProvider.jsx';
import SnippetsProvider from './providers/SnippetsProvider.jsx';
import { rootReducer } from './slices';

export default async () => {
  const defaultLanguage = 'ru';
  const baseI18NextConfig = { debug: false, resources };

  if (process.env.NODE_ENV === 'production') {
    await i18next
      .use(LanguageDetector)
      .use(initReactI18next)
      .init({ ...baseI18NextConfig, fallbackLng: defaultLanguage });
  }

  if (
    process.env.NODE_ENV === 'development' &&
    !process.env.REACT_APP_NODE_ENV
  ) {
    await i18next
      .use(LanguageDetector)
      .use(initReactI18next)
      .init(baseI18NextConfig);
  }

  if (process.env.REACT_APP_NODE_ENV === 'test') {
    await i18next
      .use(initReactI18next)
      .init({ ...baseI18NextConfig, lng: defaultLanguage });
  }

  const store = configureStore({
    reducer: rootReducer,
  });

  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    integrations: [new Sentry.BrowserTracing()],
    tracesSampleRate: 1.0,
  });

  return (
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <SnippetsProvider>
            <AppRoutes />
            <ModalWindow />
          </SnippetsProvider>
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  );
};
