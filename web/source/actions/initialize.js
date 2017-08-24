import * as Model from './../model';
import Trigger from './trigger';
import * as Actions from './types';

const HINTS: Array<Model.Hint> = [
  {
    id: 0,
    name: 'redo',
  },
  {
    id: 1,
    name: 'infinite',
  },
  {
    id: 2,
    name: 'reduce',
  },
  {
    id: 3,
    name: 'stats',
  },
  {
    id: 4,
    name: 'skip',
  },
  {
    id: 5,
    name: 'help',
  },
];

const ACT: Model.Act = {
  time: 30,
  status: Model.ACT_STATUS_PROCESS,
  count: 0,
};

export default (dispatch: (Model.State) => void, state: Model.State) => {
  state = {
    task: null,
    hints: HINTS,
    act: ACT,
  };
  dispatch(state);

  Trigger.call(Actions.ACTION_FETCH_TASK);
}
