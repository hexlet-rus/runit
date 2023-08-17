import { configureStore } from '@reduxjs/toolkit';
import * as Sentry from '@sentry/react';
import i18next from 'i18next';
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
  await i18next.use(initReactI18next).init({
    lng: defaultLanguage,
    debug: false,
    resources,
  });
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
