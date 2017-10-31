import Axios from 'axios'

import * as Model from '~/model'
import * as Constants from '~/constants'
import Trigger from './trigger'

export default (trigger: Trigger, task: string = ''): Promise<any> => {
    return new Promise((resolve, reject) => {
        trigger.stop()
        Axios.get('http://localhost:5000/fetch', {
            params: {
                identifier: trigger.state().identifier,
                label: task,
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
                trigger.archivate(response.data.label)
                trigger.push(Trigger.ACTION_FETCH, state)
                trigger.run(() => trigger.call(Trigger.ACTION_TICK))
                resolve()
            })
            .catch(exception => {
                console.log(exception)
                reject()
            })
    })
}
