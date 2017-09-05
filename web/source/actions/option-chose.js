import * as Model from './../model';
import * as Constants from './../constants';
import Trigger from './trigger';
import * as Actions from './types';

export default (trigger: Trigger, option: number) => {
  let state: Model.State = trigger.state();
  if (state.task.correctOption == option) {
    state.act.score += 1;
    trigger.call(Actions.ACTION_FETCH_TASK);
  } else {
    state.act.status = Constants.ACT_STATUS_RESULT;
    state.act.timestamp = NaN;
  }
  trigger.push(Actions.ACTION_OPTION_CHOSE, state);
}
