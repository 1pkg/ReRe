import * as Model from './../model';
import * as Actions from './types';

export default (dispatch: (Model.Action) => void) => {
    dispatch({
      type: Actions.ACTION_TICK,
    });
}
