import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Sentry from '@sentry/react';
import * as yup from 'yup';

import { BrowserRouter } from 'react-router-dom';
import { rootReducer } from './slices';
import resources from './locales/locales.js';
import AppRoutes from './AppRoutes.jsx';
import ModalWindow from './components/Modals/Modal.jsx';
import AuthProvider from './providers/AuthProvider.jsx';
import SnippetsProvider from './providers/SnippetsProvider.jsx';

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

  yup.addMethod(yup.string, 'email', function validateEmail(message) {
    return this.matches(
      /^([0-9a-zA-Z’_-]+\.)*[0-9a-zA-Z’_-]+(\+[0-9a-zA-Z.’_-]*)*@([0-9a-zA-Z-]+\.)+[a-zA-Z]{2,}$/,
      { message, name: 'email', excludeEmptyString: true },
    );
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
