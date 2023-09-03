import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authentifReducer } from './authentifReducer';
import { contactsReducer } from './contactsReducer';

const authentifPersistConfig = {
  key: 'authentif',
  storage,
  whitelist: ['token'],
};

export const store = configureStore({
  reducer: {
    authentif: persistReducer(authentifPersistConfig, authentifReducer),
    contacts: contactsReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
