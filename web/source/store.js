// @flow

import * as Redux from 'redux';
import ReduxThunk from 'redux-thunk';

import * as Model from './model';
import * as Actions from './actions/types';

const compose: any = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || Redux.compose;
export default Redux.createStore((state: ?Model.State = null, action: Actions.Action): ?Model.State => {
  return action.state ? action.state : state;
}, compose(Redux.applyMiddleware(ReduxThunk)));
