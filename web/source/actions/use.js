import Axios from 'axios'

import * as Model from './../model'
import Trigger from './trigger'
import * as Constants from './../constants'

export default (trigger: Trigger, assist: number): Promise<any> => {
    return new Promise((resolve, reject) => {
        Axios.get('http://localhost:5000/use', {
            params: {
                identifier: trigger.state().identifier,
                assist: assist,
            },
        })
            .then((response: any) => {
                let state: Model.State = trigger.state()
                switch (response.data.assist) {
                    case Constants.ASSIT_NAME_REDO:
                        state.task.effects = response.data.effects
                        trigger.archivate(response.data.label)
                        break

                    case Constants.ASSIT_NAME_INFINITE:
                        state.entry.timestamp = NaN
                        break

                    case Constants.ASSIT_NAME_REDUCE:
                        state.task.effects = response.data.effects
                        break

                    case Constants.ASSIT_NAME_STATISTIC:
                        state.task.statistic = response.data.stats
                        break

                    case Constants.ASSIT_NAME_SKIP:
                        state.task = {
                            options: response.data.options,
                            option: NaN,

                            subject: response.data.subject,
                            effects: response.data.effects,

                            reference: null,
                            statistic: [],
                        }
                        trigger.archivate(response.data.label)
                        break

                    case Constants.ASSIT_NAME_HELP:
                        state.task.reference = response.data.reference
                        break

                    default:
                        resolve()
                }
                state.entry.assists.splice(assist, 1)
                trigger.push(Trigger.ACTION_USE, state)
                resolve()
            })
            .catch(exception => {
                console.log(exception)
                reject()
            })
    })
}
