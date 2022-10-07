// Keep wdyr at top of file
// organize-imports-ignore
import './wdyr';
import 'regenerator-runtime/runtime';

import 'app/styles/prepareAppStyles';
import React from 'react';
import { createRoot } from 'react-dom/client';
import MainApp from 'app/MainApp';
import ErrorBoundary from 'app/components/common/ErrorBoundary';
import { Provider } from 'react-redux';
import store from 'app/store';
import { PersistGate } from 'redux-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore';
import { init as SentryInit } from '@sentry/browser';

const LOCAL_ENV = (process.env || 'local') as unknown as string;

const container = document.getElementById('app') as HTMLElement;
const root = createRoot(container);

const environment = LOCAL_ENV;
if (environment !== LOCAL_ENV) {
  SentryInit({
    // dsn: `https://${baseConfig.sentry.PUBLIC_KEY}@sentry.io/${baseConfig.sentry.PROJECT_ID}`,
    environment,
    // release: (config as any).sentryReleaseVersion,
  });
}

root.render(
  <ErrorBoundary>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <MainApp />
      </PersistGate>
    </Provider>
  </ErrorBoundary>
);
