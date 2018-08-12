import Axios from 'axios'

import Trigger from './trigger'
import { Analytic, Crypto, History, Json, Timestamp } from '~/helpers'

export default async (trigger, label = '', history = true) => {
    try {
        let state = trigger.state()
        state.status = Trigger.STATUS_WAIT
        trigger.push(Trigger.ACTION_WAIT, state)

        state = trigger.state()
        let response = await Axios.post('fetch', {
            token: state.token,
            label,
        })
        state.task = response.data.task
        state.task.subject = Crypto.decrypt(state.token, state.task.subject)
        state.task.subject = Json.decode(state.task.subject)
        state.stat = response.data.stat
        state.task.handled = {}
        state.option = null
        state.timestamp = Timestamp.current()
        state.status = Trigger.STATUS_ACTIVE
        history ? History.push(state.task.label) : void 0
        trigger.push(Trigger.ACTION_FETCH, state)
        return state
    } catch (exception) {
        Analytic.event(Analytic.EVENT_ERROR, exception)
        trigger.push(Trigger.ACTION_RELOAD, { status: Trigger.STATUS_ERROR })
        throw exception
    }
}
