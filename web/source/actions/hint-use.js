import * as Model from './../model';
import * as Constants from './../constants';
import Trigger from './trigger';
import * as Actions from './types';

export default (trigger: Trigger, hintIndex: number) => {
  let state: Model.State = trigger.state();
  if (!(hintIndex in Constants.HINT_LIST) && state.hints[hintIndex]) {
    return;
  }

  delete state.hints[hintIndex];
  let hint: string = Constants.HINT_LIST[hintIndex];
  switch (hint) {
    case Constants.HINT_NAME_REDO:
      state.task.subject.effects = [
        Constants.EFFECT_LIST[Math.floor(Math.random() * Constants.EFFECT_LIST.length)],
        Constants.EFFECT_LIST[Math.floor(Math.random() * Constants.EFFECT_LIST.length)],
      ];
      break;

    case Constants.HINT_NAME_INFINITE:
      state.act.timestamp = NaN;
      break;

      case Constants.HINT_NAME_REDUCE:
        state.task.subject.effects = [state.task.subject.effects[0],];
        break;

    case Constants.HINT_NAME_SKIP:
      trigger.call(Actions.ACTION_FETCH_TASK);
      break;

    default: return;
  }
  trigger.push(Actions.ACTION_HINT_USE, state);
}
