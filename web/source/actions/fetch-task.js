import Axios from 'axios';

import * as Model from './../model';
import * as Constants from './../constants';
import Trigger from './trigger';
import * as Actions from './types';

let interval: number = 0;
export default (trigger: Trigger) => {
  clearInterval(interval);
  Axios.get('http://localhost:5000/')
  .then((response: any) => {
    let state: Model.State = trigger.state();
    let timestamp: number = Math.floor(new Date().getTime() / 1000);
    state.task = response.data;
    state.task.subject.effects = [
      Constants.EFFECT_LIST[Math.floor(Math.random() * Constants.EFFECT_LIST.length)],
      Constants.EFFECT_LIST[Math.floor(Math.random() * Constants.EFFECT_LIST.length)],
    ];
    state.act.timestamp = timestamp;
    state.act.status = Constants.ACT_STATUS_PROCESS;
    trigger.push(Actions.ACTION_FETCH_TASK, state);

    interval = setInterval(() => {
      trigger.call(Actions.ACTION_TICK, interval);
    }, 1000);
  })
  .catch((exception) => console.log(exception))
}
