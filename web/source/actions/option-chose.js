import Axios from 'axios';

import * as Model from './../model';
import * as Constants from './../constants';
import Trigger from './trigger';
import * as Actions from './types';

export default (trigger: Trigger, option: number) => {
  Axios.get('http://localhost:5000/option-chose?index=' + option)
  .then((response: any) => {
    let state: Model.State = trigger.state();
    state.task.correctoption = response.data.correctoption;
    if (state.task.correctoption == option) {
      state.act.score += 1;
      trigger.call(Actions.ACTION_FETCH_TASK);
    } else {
      state.act.status = Constants.ACT_STATUS_RESULT;
      state.act.timestamp = NaN;
    }
    trigger.push(Actions.ACTION_OPTION_CHOSE, state);
  })
  .catch((exception) => console.log(exception))
}
