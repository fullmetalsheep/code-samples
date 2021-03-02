/* eslint-disable no-underscore-dangle */
import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createAsyncEncryptor from 'redux-persist-transform-encrypt';
import Cart from './modules/cart';
import SitePreferences from './modules/sitePrefs';

// eslint-disable-next-line no-unused-vars
const asyncEncryptor = createAsyncEncryptor({
  secretKey: 'ahblublu',
});

export const cartPersistConfig = {
  key: 'cart',
  storage,
  transforms: [asyncEncryptor],
};

export const persistConfig = {
  key: 'prefs',
  storage,
  blacklist: ['cart'],
};

const rootReducer = combineReducers({
  cart: persistReducer(cartPersistConfig, Cart),
  prefs: SitePreferences,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const Store = createStore(
  persistedReducer,
  process.browser &&
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const persistor = persistStore(Store);
