import * as Model from './../model';
import * as Constants from './../constants';
import Trigger from './trigger';
import * as Actions from './types';

export default (trigger: Trigger, interval: number) => {
  let state: Model.State = trigger.state();
  if (isNaN(state.entry.timestamp)) {
    clearInterval(interval);
    return;
  }

  let timestamp: number = Math.floor(new Date().getTime() / 1000);
  if (timestamp - state.entry.timestamp >= Constants.ACT_PROCESS_DURATION) {
    state.entry.status = Constants.ACT_STATUS_RESULT;
    state.entry.timestamp = NaN;
  }
  trigger.push(Actions.ACTION_TICK, state);
}
