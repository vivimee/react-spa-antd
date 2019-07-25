import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import createRoutes from '../routes';
import createStore from './createStore';
import reducers from '../redux/reducers';
import AppContainer from '../containers/AppContainer';

const store = createStore(reducers);

export default () => (
  <Provider store={store}>
    <BrowserRouter basename="/spa/hsrc">
      <AppContainer>{createRoutes()}</AppContainer>
    </BrowserRouter>
  </Provider>
);
