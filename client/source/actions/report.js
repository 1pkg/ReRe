import Axios from 'axios'

import Trigger from './trigger'

export default async (trigger, message) => {
    try {
        let state = trigger.state()
        state.status = Trigger.STATUS_WAIT
        trigger.push(Trigger.ACTION_WAIT, state)

        state = trigger.state()
        let response = await Axios.post('report', {
            token: state.token,
            message,
        })
        state.task.handled['report'] = true
        state.status = Trigger.STATUS_ACTIVE
        trigger.push(Trigger.ACTION_REPORT, state)
        return state
    } catch (exception) {
        trigger.push(Trigger.ACTION_RELOAD, { status: Trigger.STATUS_ERROR })
        throw exception
    }
}
