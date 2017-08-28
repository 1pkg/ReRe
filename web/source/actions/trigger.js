// @flow

import * as Redux from 'redux';

import * as Model from './../model';
import * as Actions from './types';

import tick from './tick';
import initialize from './initialize';
import fetchTask from './fetch-task';
import optionChose from './option-chose';
import hintUse from './hint-use';

export default class Trigger {
  actions: Map<string, (trigger: Trigger, state: Model.State, params: Array<any>) => void>;
  store: Redux.Store;

  constructor(store: Redux.Store) {
    this.store = store;

    this.actions = new Map();
    this.actions.set(Actions.ACTION_TICK, tick);
    this.actions.set(Actions.ACTION_INITIALIZE, initialize);
    this.actions.set(Actions.ACTION_FETCH_TASK, fetchTask);
    this.actions.set(Actions.ACTION_OPTION_CHOSE, optionChose);
    this.actions.set(Actions.ACTION_HINT_USE, hintUse);
  }

  call(name: string, ...params: Array<any>) {
    if (this.actions.has(name)) {
      let action: any = this.actions.get(name);
      action(this, this.getState(), ...params);
    }
  }

  dispatch(name: string, state: Model.State) {
     setTimeout(() => {
       this.store.dispatch({type: name, state});
     }, 0);
  }

  getState(): Model.State {
    return JSON.parse(JSON.stringify(this.store.getState()));
  }
}
