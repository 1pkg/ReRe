import Axios from 'axios'

import Trigger from './trigger'
import { Analytic } from '~/helpers'

export default async (trigger, option, statless = false) => {
    try {
        let state = trigger.state()
        state.status = Trigger.STATUS_WAIT
        trigger.push(Trigger.ACTION_WAIT, state)

        state = trigger.state()
        let response = await Axios.post('choose', {
            token: state.token,
            option,
        })
        if (!statless) {
            state.option = response.data.option
            state.timestamp = null
            state.status = response.data.result
                ? Trigger.STATUS_CORRECT
                : Trigger.STATUS_WRONG
            trigger.push(Trigger.ACTION_CHOOSE, state)
            return state
        }
        return state
    } catch (exception) {
        Analytic.event(Analytic.EVENT_ERROR, exception)
        trigger.push(Trigger.ACTION_RELOAD, { status: Trigger.STATUS_ERROR })
        throw exception
    }
}
