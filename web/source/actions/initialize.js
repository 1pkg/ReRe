import Axios from 'axios';

import * as Model from './../model';
import * as Constants from './../constants';
import Trigger from './trigger';
import * as Actions from './types';

export default (trigger: Trigger) => {
  Axios.get('http://localhost:5000/initialize', {
    params: {
      identifier: trigger.state().identifier,
    }
  })
  .then((response: any) => {
    let state: Model.State = trigger.state();
    state.timestamp = NaN;
    state.status = Constants.STATUS_PREVIEW;
    state.task = null;
    state.assists = response.data.assists;
    state.score = 0;
    trigger.push(Actions.ACTION_INITIALIZE, state);
    trigger.call(Actions.ACTION_FETCH);
  })
  .catch((exception) => console.log(exception));
}
