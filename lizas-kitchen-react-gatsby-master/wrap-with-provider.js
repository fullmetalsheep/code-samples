import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import { setAutoFreeze } from 'immer';
import { Store, persistor } from './store';

// immer by default prevents directly editing state, which is what 'redux-persist' does
// this feature of immer called Auto freeze, should be disabled in order to redux-persist to work.
setAutoFreeze(false);

const store = Store;

// eslint-disable-next-line react/display-name,react/prop-types
export default ({ element }) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {element}
    </PersistGate>
  </Provider>
);
