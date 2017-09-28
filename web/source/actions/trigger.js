// @flow

import * as Redux from 'redux';
import Clone from 'clone';

import * as Model from './../model';
import * as Actions from './types';

import Tick from './tick';
import Identify from './identify';
import Initialize from './initialize';
import Fetch from './fetch';
import Chose from './chose';
import Use from './use';

export default class Trigger {
  actions: Map<string, (trigger: Trigger, params: Array<any>) => void>;
  store: Redux.Store;

  constructor(store: Redux.Store) {
    this.store = store;

    this.actions = new Map();
    this.actions.set(Actions.ACTION_TICK, Tick);
    this.actions.set(Actions.ACTION_IDENTIFY, Identify);
    this.actions.set(Actions.ACTION_INITIALIZE, Initialize);
    this.actions.set(Actions.ACTION_FETCH, Fetch);
    this.actions.set(Actions.ACTION_CHOSE, Chose);
    this.actions.set(Actions.ACTION_USE, Use);
  }

  state(): Model.State {
    return Clone(this.store.getState());
  }

  call(name: string, ...params: Array<any>) {
    if (this.actions.has(name)) {
      let action: any = this.actions.get(name);
      action(this, ...params);
    }
  }

  push(name: string, state: Model.State) {
     setTimeout(() => {
       this.store.dispatch({type: name, state});
     }, 0);
  }
}
