import Axios from 'axios'

import * as Model from './../model'
import Trigger from './trigger'
import * as Constants from './../constants'

export default (trigger: Trigger) => {
    trigger.stop()
    Axios.get('http://localhost:5000/fetch', {
        params: {
            identifier: trigger.state().identifier,
        },
    })
        .then((response: any) => {
            let state: Model.State = trigger.state()
            state.entry.timestamp = trigger.timestamp()
            state.entry.status = Constants.STATUS_PROCESS
            state.task = {
                options: response.data.options,
                option: NaN,

                subject: response.data.subject,
                effects: response.data.effects,

                reference: null,
                statistic: [],
            }
            trigger.push(Trigger.ACTION_FETCH, state)
            trigger.run(() => trigger.call(Trigger.ACTION_TICK))
        })
        .catch(exception => console.log(exception))
}
