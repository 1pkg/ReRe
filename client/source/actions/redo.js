import Axios from 'axios'

import { Crypto, History, Json } from '~/helpers'
import Trigger from './trigger'

export default trigger => {
    let state = trigger.state()
    return new Promise((resolve, reject) => {
        Axios.get(API.concat('redo'), {
            params: {
                token: state.token,
                identity: state.identity,
            },
        })
            .then(response => {
                let state = trigger.state()
                state.identity = response.data.identity
                state.task = response.data.task
                state.task.subject = Crypto.decrypt(
                    state.token,
                    state.task.subject,
                )
                state.task.subject = Json.decode(state.task.subject)

                History.push(state.task.label)
                trigger.push(Trigger.ACTION_REDO, state)
                resolve()
            })
            .catch(exception => {
                reject()
            })
    })
}
