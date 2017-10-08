import Axios from 'axios';

import * as Model from './../model';
import * as Constants from './../constants';
import Trigger from './trigger';
import * as Actions from './types';

export default (trigger: Trigger) => {
  let state: Model.State = trigger.state();
  Axios.get('http://localhost:5000/initialize', {
    params: {
      identifier: state.entry.identifier,
    }
  })
  .then((response: any) => {
    let state: Model.State = trigger.state();

    state.entry.timestamp = NaN;
    state.entry.status = Constants.ACT_STATUS_NONE;
    state.entry.score = 0;
    state.assists = response.data.assists;

    trigger.push(Actions.ACTION_INITIALIZE, state);
    trigger.call(Actions.ACTION_FETCH);
  })
  .catch((exception) => console.log(exception));
}
