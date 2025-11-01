import { configureStore } from '@reduxjs/toolkit';
import * as Sentry from '@sentry/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import '@mantine/core/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createTRPCClient, httpLink } from '@trpc/client';
import type { AppRouter } from '../../types/router/index';
import AppRoutes from './AppRoutes';
import ModalWindow from './components/Modals/index';
import Toast from './components/Toast/index';
import AuthProvider from './providers/AuthProvider';
import SnippetsProvider from './providers/SnippetsProvider';
import { rootReducer } from './slices/index';
import { initI18next } from './initI18next';
import { TRPCProvider } from './utils/trpc';
import { MantineProvider } from '@mantine/core';

const makeQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });

export default async () => {
  const queryClient = makeQueryClient();
  const trpcClient = createTRPCClient<AppRouter>({
    links: [
      httpLink({
        url: '/trpc',
        headers() {
          const token = localStorage.getItem('token');
          return token ? { authorization: `Bearer ${token}` } : {};
        },
      }),
    ],
  });

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
    <QueryClientProvider client={queryClient}>
      <TRPCProvider queryClient={queryClient} trpcClient={trpcClient}>
        <Provider store={store}>
          <BrowserRouter>
            <AuthProvider>
              <SnippetsProvider>
                <MantineProvider withStaticClasses withCssVariables>
                  <AppRoutes />
                  <ModalWindow />
                </MantineProvider>
                <Toast />
              </SnippetsProvider>
            </AuthProvider>
          </BrowserRouter>
        </Provider>
      </TRPCProvider>
    </QueryClientProvider>
  );
};
