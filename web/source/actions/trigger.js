// @flow

import * as Model from './../model';
import * as Actions from './types';
import initialize from './initialize';
import optionChose from './optionChose';

class Trigger {
  actions: Map<string, (dispatch: (Model.Action) => void, params: Array<any>) => void> = new Map()

  constructor() {
    this.actions.set(Actions.ACTION_INITIALIZE, initialize);
    this.actions.set(Actions.ACTION_OPTION_CHOSE, optionChose);
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
