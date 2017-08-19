// @flow

import * as Model from './../model';
import * as Actions from './../actions/types';

export default (time: number = 0, action: Model.Action): number => {
  switch(action.type) {
    case Actions.ACTION_INITIALIZE:
      return 15;

    case Actions.ACTION_TICK:
      return (time - 1 > 0) ? time - 1 : 15;

    default:
      return time;
  }
}
