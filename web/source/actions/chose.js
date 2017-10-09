import Axios from 'axios';

import * as Model from './../model';
import * as Constants from './../constants';
import Trigger from './trigger';
import * as Actions from './types';

export default (trigger: Trigger, option: string) => {
  Axios.get('http://localhost:5000/chose', {
    params: {
      identifier: trigger.state().identifier,
      option: option,
    }
  })
  .then((response: any) => {
    let state: Model.State = trigger.state();
    state.task.option = response.data.option;
    if (state.task.option == option && response.data.result) {
      state.status = Constants.STATUS_PREVIEW;
      state.score += 1;
      trigger.call(Actions.ACTION_FETCH);
    } else {
      state.status = Constants.STATUS_RESULT;
      state.timestamp = NaN;
      state.effects = [];
    }
    trigger.push(Actions.ACTION_CHOSE, state);
  })
  .catch((exception) => console.log(exception));
}
