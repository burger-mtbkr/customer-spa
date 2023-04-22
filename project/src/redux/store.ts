import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { reducer } from '../reducers';
import rootSaga from '../sagas/root.saga';
import storage from 'redux-persist/lib/storage';

// import storageSession from 'redux-persist/lib/storage/session'

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    ...reducer,
  }),
);

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .prepend(sagaMiddleware)
      .concat(logger),
});

const persistor = persistStore(store);
sagaMiddleware.run(rootSaga);

export { store, persistor };
