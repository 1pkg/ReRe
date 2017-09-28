import Axios from 'axios';

import * as Model from './../model';
import * as Constants from './../constants';
import Trigger from './trigger';
import * as Actions from './types';

export default (trigger: Trigger) => {
  let state: Model.State = trigger.state();
  Axios.get('http://localhost:5000/identify', {
    params: {
      identifier: state ? state.entry.identifier : null,
    }
  })
  .then((response: any) => {
    let entry: Model.Entry = {
      timestamp: NaN,
      status: Constants.ACT_STATUS_NONE,
      score: NaN,
      identifier: response.data.identifier,
    };
    let state: Model.State = {
        task: null,
        assists: [],
        entry: entry,
    };

    trigger.push(Actions.ACTION_IDENTIFY, state);
  })
  .catch((exception) => console.log(exception));
}
