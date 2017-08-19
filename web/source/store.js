// @flow

import * as Redux from 'redux';
import ReduxThunk from 'redux-thunk';

import ReducerTask from './reducers/task'
import ReducerHint from './reducers/hint'
import ReducerMain from './reducers/main'

const compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || Redux.compose;
const reducer = Redux.combineReducers({
  task: ReducerTask,
  hints: ReducerHint,
  time: ReducerMain,
});
export default Redux.createStore(reducer, compose(Redux.applyMiddleware(ReduxThunk)));
