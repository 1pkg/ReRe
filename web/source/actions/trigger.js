// @flow

import * as Model from './../model';
import * as Actions from './types';
import initialize from './initialize';
import optionChose from './optionChose';
import tick from './tick';

class Trigger {
  actions: Map<string, (dispatch: (Model.Action) => void, params: Array<any>) => void>;

  constructor() {
    this.actions = new Map();
    this.actions.set(Actions.ACTION_INITIALIZE, initialize);
    this.actions.set(Actions.ACTION_OPTION_CHOSE, optionChose);
    this.actions.set(Actions.ACTION_TICK, tick);
  }

  call(dispatch: (Model.Action) => void, name: string, ...params: Array<any>) {
    if (this.actions.has(name)) {
      let action: any = this.actions.get(name);
      action(dispatch, ...params);
    } else {
      throw 'action doesn\'t exists';
    }
  }
}
export default new Trigger();
