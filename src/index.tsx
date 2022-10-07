// Keep wdyr at top of file
// organize-imports-ignore
import './wdyr';
import 'regenerator-runtime/runtime';

import React from 'react';
import { createRoot } from 'react-dom/client';
import MainApp from 'app/MainApp';
import ErrorBoundary from 'app/components/common/ErrorBoundary';
import { Provider } from 'react-redux';
import store from 'app/store';
import { PersistGate } from 'redux-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore';

const container = document.getElementById('app') as HTMLElement;
const root = createRoot(container);
root.render(
  <ErrorBoundary>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <MainApp />
      </PersistGate>
    </Provider>
  </ErrorBoundary>
);
