import * as Model from './../model';
import * as Actions from './types';

export default (dispatch: (Model.State) => void, state: Model.State, hintId: number) => {
  state.hints = state.hints.filter((hint: Model.Hint) => hint.id != hintId);
  if (hintId == 1) {
    state.act.time = Infinity;
  }
  dispatch(state);
}
