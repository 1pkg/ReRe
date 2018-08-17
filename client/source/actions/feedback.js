import Axios from 'axios'

import Trigger from './trigger'

export default async (trigger, message) => {
    let state = trigger.state()
    let oldstatus = state.status
    state.status = Trigger.STATUS_WAIT
    trigger.push(Trigger.ACTION_WAIT, state)

    state = trigger.state()
    await Axios.post('feedback', {
        token: state.token,
        message,
    })
    state.status = oldstatus
    trigger.push(Trigger.ACTION_FEEDBACK, state)
    return state
}
