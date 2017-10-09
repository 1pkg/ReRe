import * as Model from './../model';
import * as Constants from './../constants';
import Trigger from './trigger';
import * as Actions from './types';

// todo send chose -1 on expire
export default (trigger: Trigger, interval: number) => {
  let state: Model.State = trigger.state();
  if (isNaN(state.timestamp)) {
    clearInterval(interval);
    return;
  }
  let timestamp: number = Math.floor(new Date().getTime() / 1000);
  if (timestamp - state.timestamp >= Constants.PROCESS_DURATION) {
    state.timestamp = NaN;
    state.status = Constants.STATUS_RESULT;
  }
  trigger.push(Actions.ACTION_TICK, state);
}
