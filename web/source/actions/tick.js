import * as Model from './../model';
import * as Constants from './../constants';
import Trigger from './trigger';
import * as Actions from './types';

export default (trigger: Trigger, state: Model.State, interval: number) => {
  if (!Number.isFinite(state.act.time) || state.act.status != Constants.ACT_STATUS_PROCESS) {
    clearInterval(interval);
    return;
  }

  if (state.act.time - 1 <= 0) {
    state.act.status = Constants.ACT_STATUS_FAILED;
  } else {
    state.act.time -= 1;
  }
  trigger.dispatch(Actions.ACTION_TICK, state);
}
