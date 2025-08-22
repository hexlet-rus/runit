import { configureStore } from '@reduxjs/toolkit';
import * as Sentry from '@sentry/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import AppRoutes from './AppRoutes';
import ModalWindow from './components/Modals/index';
import Toast from './components/Toast/index';
import AuthProvider from './providers/AuthProvider';
import SnippetsProvider from './providers/SnippetsProvider';
import { rootReducer } from './slices/index';
import { initI18next } from './initI18next';

export default async () => {
  await initI18next();

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
            <Toast />
          </SnippetsProvider>
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  );
};
