import * as Model from './../model';
import Trigger from './trigger';
import * as Actions from './types';

export default (trigger: Trigger, state: Model.State, hintId: number) => {
  state.hints = state.hints.filter((hint: Model.Hint) => hint.id != hintId);
  if (hintId == 1) {
    state.act.time = Infinity;
  }
  trigger.dispatch(Actions.ACTION_HINT_USE, state);
}
