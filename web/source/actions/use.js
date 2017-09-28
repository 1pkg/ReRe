import * as Model from './../model';
import * as Constants from './../constants';
import Trigger from './trigger';
import * as Actions from './types';

export default (trigger: Trigger, assit: string) => {
  let state: Model.State = trigger.state();
  switch (assit) {
    case Constants.ASSIT_NAME_REDO:
      state.task.subject.effects = [
        Constants.EFFECT_LIST[Math.floor(Math.random() * Constants.EFFECT_LIST.length)],
        Constants.EFFECT_LIST[Math.floor(Math.random() * Constants.EFFECT_LIST.length)],
      ];
      break;

    case Constants.ASSIT_NAME_INFINITE:
      state.entry.timestamp = NaN;
      break;

      case Constants.ASSIT_NAME_REDUCE:
        state.task.subject.effects = [state.task.subject.effects[0],];
        break;

    case Constants.ASSIT_NAME_SKIP:
      trigger.call(Actions.ACTION_FETCH);
      break;

    default: return;
  }
  let index = state.assists.indexOf(assit);
  if (index > -1) {
    state.assists.splice(index, 1);
  }
  trigger.push(Actions.ACTION_USE, state);
}
