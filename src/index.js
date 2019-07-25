/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import { render } from 'react-dom';
import App from './core/App';

const root = document.createElement('div');
document.body.appendChild(root);

render(<App />, root);

if (module.hot) {
  module.hot.accept('./core/App.jsx', () => {
    const NewApp = require('./core/App.jsx').default;
    render(<NewApp />, root);
  });
}
