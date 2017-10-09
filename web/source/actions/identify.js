import Axios from 'axios';

import * as Model from './../model';
import * as Constants from './../constants';
import Trigger from './trigger';
import * as Actions from './types';

export default (trigger: Trigger) => {
  Axios.get('http://localhost:5000/identify', {
    params: {
      identifier: trigger.state() ? trigger.state().identifier : null,
    }
  })
  .then((response: any) => {
    let state: Model.State = {
        identifier: response.data.identifier,
        timestamp: NaN,
        status: '',
        task: null,
        assists: [],
        score: NaN,
    };
    trigger.push(Actions.ACTION_IDENTIFY, state);
  })
  .catch((exception) => console.log(exception));
}
