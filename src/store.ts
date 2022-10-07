import { configureStore } from '@reduxjs/toolkit';
import { rootEpic } from 'app/epics';
import rootReducers, { initialState, RootState } from 'app/reducers';
import { createEpicMiddleware } from 'redux-observable';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PersistConfig,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import { createWhitelistFilter } from 'redux-persist-transform-filter';
import storage from 'redux-persist/lib/storage';

const epicMiddleware = createEpicMiddleware({
  dependencies: {
    api: '',
  },
});

const persistConfig: PersistConfig<RootState> = {
  whitelist: ['users'],
  blacklist: [],
  transforms: [
    createWhitelistFilter('dropdown', ['cachedOptions']),
    createWhitelistFilter('users', ['user']),
  ],
  storage: storage,
  key: 'app',
};

const reducers = persistReducer(persistConfig, rootReducers);

export function configureLocalStore() {
  const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(epicMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: initialState,
  });

  epicMiddleware.run(rootEpic);

  return store;
}

export default configureLocalStore();
