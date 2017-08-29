import * as Model from './../model';
import Trigger from './trigger';
import * as Actions from './types';

export default (trigger: Trigger, hintId: number) => {
  let state: Model.State = trigger.state();
  state.hints = state.hints.filter((hint: Model.Hint) => hint.id != hintId);
  if (hintId == 1) {
    state.act.timestamp = NaN;
  }
  trigger.push(Actions.ACTION_HINT_USE, state);
}
