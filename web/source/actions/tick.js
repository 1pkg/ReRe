import * as Model from './../model';
import * as Constants from './../constants';
import Trigger from './trigger';
import * as Actions from './types';

export default (trigger: Trigger, interval: number) => {
  let state: Model.State = trigger.state();
  if (isNaN(state.act.timestamp)) {
    clearInterval(interval);
    return;
  }

  let timestamp: number = Math.floor(new Date().getTime() / 1000);
  if (timestamp - state.act.timestamp >= Constants.ACT_PROCESS_DURATION) {
    state.act.status = Constants.ACT_STATUS_RESULT;
    state.act.timestamp = NaN;
  }
  trigger.push(Actions.ACTION_TICK, state);
}
