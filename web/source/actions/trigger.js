// @flow

import * as Redux from 'redux';
import clone from 'clone';

import * as Model from './../model';
import * as Actions from './types';

import tick from './tick';
import splash from './splash';
import fetchTask from './fetch-task';
import optionChose from './option-chose';
import hintUse from './hint-use';

export default class Trigger {
  actions: Map<string, (trigger: Trigger, params: Array<any>) => void>;
  store: Redux.Store;

  constructor(store: Redux.Store) {
    this.store = store;

    this.actions = new Map();
    this.actions.set(Actions.ACTION_TICK, tick);
    this.actions.set(Actions.ACTION_SPLASH, splash);
    this.actions.set(Actions.ACTION_FETCH_TASK, fetchTask);
    this.actions.set(Actions.ACTION_OPTION_CHOSE, optionChose);
    this.actions.set(Actions.ACTION_HINT_USE, hintUse);
  }

  state(): Model.State {
    return clone(this.store.getState());
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
