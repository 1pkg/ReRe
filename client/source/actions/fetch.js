import Axios from 'axios'

import { Crypto, Json, Timestamp } from '~/helpers'
import Trigger from './trigger'

export default (trigger, label = '') => {
    let state = trigger.state()
    return new Promise((resolve, reject) => {
        Axios.get(API.concat('fetch'), {
            params: {
                token: state.token,
                label: label,
            },
        })
            .then(response => {
                let state = trigger.state()
                state.option = null
                state.identity = response.data.identity
                state.task = response.data.task
                state.task.subject = Json.decode(
                    Crypto.decrypt(state.token, state.task.subject),
                )
                state.timestamp = Timestamp.current()
                state.status = trigger.STATUS_ACTIVE
                trigger.push(Trigger.ACTION_FETCH, state)
                resolve()
            })
            .catch(exception => {
                console.log(exception)
                reject()
            })
    })
}
