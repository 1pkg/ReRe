import Axios from 'axios'

import Trigger from './trigger'
import { Analytic, Crypto, History, Json } from '~/helpers'

export default async trigger => {
    try {
        let state = trigger.state()
        state.status = Trigger.STATUS_WAIT
        trigger.push(Trigger.ACTION_WAIT, state)

        state = trigger.state()
        let response = await Axios.post('remake', {
            token: state.token,
        })
        state.task = response.data
        state.task.subject = Crypto.decrypt(state.token, state.task.subject)
        state.task.subject = Json.decode(state.task.subject)
        state.task.handled = {}
        state.status = Trigger.STATUS_ACTIVE
        History.push(state.task.label)
        trigger.push(Trigger.ACTION_REMAKE, state)
        return state
    } catch (exception) {
        Analytic.event(Analytic.EVENT_ERROR, exception)
        trigger.push(Trigger.ACTION_RELOAD, { status: Trigger.STATUS_ERROR })
        throw exception
    }
}
