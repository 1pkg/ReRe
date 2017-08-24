import * as Model from './../model';
import Trigger from './trigger';
import * as Actions from './types';

export default (dispatch: (Model.State) => void, state: Model.State, optionId: number) => {
  if (state.task.image.optionId == optionId) {
    state.act.count += 1;
    state.act.time = 30;
    dispatch(state);

    Trigger.call(Actions.ACTION_FETCH_TASK);
  } else {
    state.act.status = Model.ACT_STATUS_FAILED;
    dispatch(state);
  }
}
