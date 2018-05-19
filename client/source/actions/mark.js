import Axios from 'axios'

import Trigger from './trigger'

export default async (trigger, type) => {
    try {
        let state = trigger.state()
        state.status = Trigger.STATUS_WAIT
        trigger.push(Trigger.ACTION_WAIT, state)

        state = trigger.state()
        let response = await Axios.post('mark', {
            token: state.token,
            type,
        })
        state.task.handled[type] = true
        state.status = Trigger.STATUS_ACTIVE
        trigger.push(Trigger.ACTION_MARK, state)
        return state
    } catch (exception) {
        trigger.push(Trigger.ACTION_RELOAD, { status: Trigger.STATUS_ERROR })
        throw exception
    }
}
