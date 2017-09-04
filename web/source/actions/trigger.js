// @flow

import * as Redux from 'redux';
import Clone from 'clone';

import * as Model from './../model';
import * as Actions from './types';

import Tick from './tick';
import Splash from './splash';
import FetchTask from './fetch-task';
import OptionChose from './option-chose';
import HintUse from './hint-use';

export default class Trigger {
  actions: Map<string, (trigger: Trigger, params: Array<any>) => void>;
  store: Redux.Store;

  constructor(store: Redux.Store) {
    this.store = store;

    this.actions = new Map();
    this.actions.set(Actions.ACTION_TICK, Tick);
    this.actions.set(Actions.ACTION_SPLASH, Splash);
    this.actions.set(Actions.ACTION_FETCH_TASK, FetchTask);
    this.actions.set(Actions.ACTION_OPTION_CHOSE, OptionChose);
    this.actions.set(Actions.ACTION_HINT_USE, HintUse);
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
