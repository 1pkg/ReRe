import Axios from 'axios'

import { Crypto, History, Json, Timestamp } from '~/helpers'
import Trigger from './trigger'

export default async (trigger, label = '', push = true) => {
    let response = await Axios.post('fetch', {
        token: trigger.state().token,
        label: label,
    })
    let state = trigger.state()
    state.task = response.data
    state.task.subject = Crypto.decrypt(state.token, state.task.subject)
    state.task.subject = Json.decode(state.task.subject)
    state.option = null
    state.timestamp = Timestamp.current()
    state.status = Trigger.STATUS_ACTIVE
    if (push) History.push(state.task.label)
    trigger.push(Trigger.ACTION_FETCH, state)
    return state
}
