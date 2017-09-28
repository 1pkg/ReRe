import Axios from 'axios';

import * as Model from './../model';
import * as Constants from './../constants';
import Trigger from './trigger';
import * as Actions from './types';

let interval: number = 0;
export default (trigger: Trigger) => {
  let state: Model.State = trigger.state();
  Axios.get('http://localhost:5000/fetch', {
    params: {
      identifier: state.entry.identifier,
    }
  })
  .then((response: any) => {
    let state: Model.State = trigger.state();
    let timestamp: number = Math.floor(new Date().getTime() / 1000);

    state.entry.timestamp = timestamp;
    state.entry.status = Constants.ACT_STATUS_PROCESS;

    let task: Model.Task = {
      options: response.data.options,
      subject: response.data.subject,
      correctoption: NaN,
    }
    task.subject.effects = [
      Constants.EFFECT_LIST[Math.floor(Math.random() * Constants.EFFECT_LIST.length)],
      Constants.EFFECT_LIST[Math.floor(Math.random() * Constants.EFFECT_LIST.length)],
    ];
    state.task = task;

    trigger.push(Actions.ACTION_FETCH, state);

    interval = setInterval(() => {
      trigger.call(Actions.ACTION_TICK, interval);
    }, 1000);
  })
  .catch((exception) => console.log(exception));
  clearInterval(interval);
}
