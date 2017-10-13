import Axios from 'axios';

import * as Model from './../model';
import * as Constants from './../constants';
import Trigger from './trigger';
import * as Actions from './types';

let interval: number = 0;
export default (trigger: Trigger) => {
  Axios.get('http://localhost:5000/fetch', {
    params: {
      identifier: trigger.state().identifier,
    }
  })
  .then((response: any) => {
    let state: Model.State = trigger.state();
    state.timestamp = trigger.timestamp();
    state.status = Constants.STATUS_PROCESS;
    state.task = {
      options: response.data.options,
      subject: response.data.subject,
      effects: response.data.effects,
      option: NaN,
      references: [],
      stats: [],
    };
    trigger.push(Actions.ACTION_FETCH, state);
    interval = setInterval(() => {
      trigger.call(Actions.ACTION_TICK, interval);
    }, 1000);
  })
  .catch((exception) => console.log(exception));
  clearInterval(interval);
}
