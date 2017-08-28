import * as Model from './../model';
import * as Constants from './../constants';
import Trigger from './trigger';
import * as Actions from './types';

export default (trigger: Trigger, state: Model.State, optionId: number) => {
  if (state.task.image.optionId == optionId) {
    state.act.count += 1;
    state.act.time = 30;
    trigger.dispatch(state);

    trigger.call(Actions.ACTION_FETCH_TASK);
  } else {
    state.act.status = Constants.ACT_STATUS_FAILED;
    trigger.dispatch(Actions.ACTION_OPTION_CHOSE, state);
  }
}
