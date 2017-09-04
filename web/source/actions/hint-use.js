import * as Model from './../model';
import * as Constants from './../constants';
import Trigger from './trigger';
import * as Actions from './types';

export default (trigger: Trigger, hintId: number) => {
  if (!(hintId in Constants.HINT_LIST)) {
    return;
  }

  let state: Model.State = trigger.state();
  state.hints = state.hints.filter((hint: Model.Hint) => hint.id != hintId);
  let hint: string = Constants.HINT_LIST[hintId];
  switch (hint) {
    case Constants.HINT_NAME_REDO:
      state.task.image.effects = [
        Constants.EFFECT_LIST[Math.floor(Math.random() * Constants.EFFECT_LIST.length)],
        Constants.EFFECT_LIST[Math.floor(Math.random() * Constants.EFFECT_LIST.length)],
      ];
      break;

    case Constants.HINT_NAME_INFINITE:
      state.act.timestamp = NaN;
      break;

      case Constants.HINT_NAME_REDUCE:
        state.task.image.effects = [state.task.image.effects[0],];
        break;

    case Constants.HINT_NAME_SKIP:
      trigger.call(Actions.ACTION_FETCH_TASK);
      break;

    default: return;
  }
  trigger.push(Actions.ACTION_HINT_USE, state);
}
