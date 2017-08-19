// @flow

import * as Model from './../model';
import * as Actions from './../actions/types';

export default (state: string = 'active', action: Model.Action): string => {
  switch(action.type) {
    default:
      return state;
  }
}
