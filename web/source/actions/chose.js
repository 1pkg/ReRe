import Axios from 'axios'

import * as Model from '~/model'
import * as Constants from '~/constants'
import Trigger from './trigger'

export default (trigger: Trigger, option: number): Promise<any> => {
    return new Promise((resolve, reject) => {
        Axios.get('http://localhost:5000/chose', {
            params: {
                identifier: trigger.state().identifier,
                option: option,
            },
        })
            .then((response: any) => {
                let state: Model.State = trigger.state()
                if (response.data.result) {
                    state.entry.timestamp = NaN
                    state.entry.status = Constants.STATUS_PREVIEW
                    state.entry.number += 1
                    state.entry.score += 1

                    trigger.call(Trigger.ACTION_FETCH)
                } else {
                    state.entry.timestamp = NaN
                    state.entry.status = Constants.STATUS_RESULT

                    state.task.option = NaN
                    state.task.effects = []

                    state.task.option = response.data.option
                }
                trigger.push(Trigger.ACTION_CHOSE, state)
                resolve()
            })
            .catch(exception => {
                console.log(exception)
                reject()
            })
    })
}
