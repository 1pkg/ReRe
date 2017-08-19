// @flow

import * as Model from './../model';
import * as Actions from './../actions/types';

export default (hints: Array<Model.Hint> = [], action: Model.Action): Array<Model.Hint> => {
  switch(action.type) {
    case Actions.ACTION_INITIALIZE:
      return action.payload.hints;

    case Actions.ACTION_HINT_USE:
    {
      let hintId: number = action.payload;
      return hints.filter((hint: Model.Hint) => hint.id != hintId);
    }

    default:
      return hints;
  }
}
