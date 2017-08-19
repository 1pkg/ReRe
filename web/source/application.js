// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'react-redux';

import Store from './store'
import Main from './components/main';

ReactDOM.render(
  <Redux.Provider store={Store}>
    <Main />
  </Redux.Provider>,
  document.getElementById('root')
);
