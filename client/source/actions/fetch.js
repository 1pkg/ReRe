import Axios from 'axios'

import { Crypto, History, Json, Timestamp } from '~/helpers'
import Trigger from './trigger'

export default async (trigger, label = '', history = true) => {
    try {
        let state = trigger.state()
        let response = await Axios.post('fetch', {
            token: state.token,
            label,
        })
        state.task = response.data
        state.task.subject = Crypto.decrypt(state.token, state.task.subject)
        state.task.subject = Json.decode(state.task.subject)
        state.task.handled = {}
        state.option = null
        state.timestamp = Timestamp.current()
        state.status = Trigger.STATUS_ACTIVE
        history ? History.push(state.task.label) : void 0
        trigger.push(Trigger.ACTION_FETCH, state)
        return state
    } catch (exception) {
        trigger.push(Trigger.ACTION_RELOAD, {})
        throw exception
    }
}
