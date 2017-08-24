import * as Model from './../model';
import * as Actions from './types';

export default (dispatch: (Model.State) => void, state: Model.State, interval: number) => {
  if (!Number.isFinite(state.act.time) || state.act.status != Model.ACT_STATUS_PROCESS) {
    clearInterval(interval);
    return;
  }
  
  if (state.act.time - 1 <= 0) {
    state.act.status = Model.ACT_STATUS_FAILED;
  } else {
    state.act.time -= 1;
  }
  dispatch(state);
}
