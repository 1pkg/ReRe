import Axios from 'axios'

import * as Model from './../model'
import Trigger from './trigger'
import * as Constants from './../constants'

export default (trigger: Trigger, task: string = ''): Promise<any> => {
    return new Promise((resolve, reject) => {
        trigger.stop()
        Axios.get('http://localhost:5000/initialize', {
            params: {
                identifier: trigger.state().identifier,
            },
        })
            .then((response: any) => {
                let state: Model.State = trigger.state()
                state.entry = {
                    timestamp: NaN,
                    status: Constants.STATUS_PREVIEW,
                    number: 0,
                    score: 0,

                    assists: response.data.assists,
                }
                trigger.push(Trigger.ACTION_INITIALIZE, state)
                trigger.call(Trigger.ACTION_FETCH, task)
                resolve()
            })
            .catch(exception => {
                console.log(exception)
                reject()
            })
    })
}
