import Axios from 'axios'

import * as Model from './../model'
import Trigger from './trigger'
import * as Constants from './../constants'

export default (trigger: Trigger) => {
    trigger.stop()
    Axios.get('http://localhost:5000/identify', {
        params: {
            identifier: trigger.state() ? trigger.state().identifier : null,
        },
    })
        .then((response: any) => {
            let state: Model.State = {
                identifier: response.data.identifier,
                settings: response.data.settings,
                entry: null,
                task: null,
            }
            trigger.push(Trigger.ACTION_IDENTIFY, state)
        })
        .catch(exception => console.log(exception))
}
