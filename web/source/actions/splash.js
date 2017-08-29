import * as Model from './../model';
import * as Constants from './../constants';
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
  timestamp: NaN,
  status: Constants.ACT_STATUS_SPLASH,
  score: 0,
};

export default (trigger: Trigger) => {
  let state:Model.State  = {
    task: null,
    hints: HINTS,
    act: ACT,
  };
  trigger.push(Actions.ACTION_SPLASH, state);
}
