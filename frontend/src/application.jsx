import { configureStore } from '@reduxjs/toolkit';
import * as Sentry from '@sentry/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import AppRoutes from './AppRoutes.jsx';
import ModalWindow from './components/Modals';
import Toast from './components/Toast';
import AuthProvider from './providers/AuthProvider.jsx';
import SnippetsProvider from './providers/SnippetsProvider.jsx';
import { rootReducer } from './slices';
import { initI18next } from './initI18next.js';

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
