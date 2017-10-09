import Axios from 'axios';

import * as Model from './../model';
import * as Constants from './../constants';
import Trigger from './trigger';
import * as Actions from './types';

export default (trigger: Trigger, assist: string) => {
  Axios.get('http://localhost:5000/use', {
    params: {
      identifier: trigger.state().identifier,
      assist: assist,
    }
  })
  .then((response: any) => {
    let state: Model.State = trigger.state();
    switch (response.data.assist) {
      case Constants.ASSIT_NAME_REDO:
        state.task.effects = response.data.effects;
        break;

      case Constants.ASSIT_NAME_INFINITE:
        state.timestamp = NaN;
        break;

      case Constants.ASSIT_NAME_REDUCE:
        state.task.effects = response.data.effects;
        break;

      case Constants.ASSIT_NAME_STATS:
        state.task.stats = response.data.stats;
        break;

      case Constants.ASSIT_NAME_SKIP:
        state.task = response.data.task;
        break;

      case Constants.ASSIT_NAME_HELP:
        state.task.references = response.data.references;
        break;

      default: return;
    }
    state.assists.splice(assist, 1);
    trigger.push(Actions.ACTION_USE, state);
  })
  .catch((exception) => console.log(exception));
}
