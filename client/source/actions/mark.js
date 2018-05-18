import Axios from 'axios'

import Trigger from './trigger'

export default async (trigger, type) => {
    try {
        let state = trigger.state()
        let response = await Axios.post('mark', {
            token: state.token,
            type,
        })
        state.task.handled[type] = true
        trigger.push(Trigger.ACTION_MARK, state)
        return state
    } catch (exception) {
        trigger.push(Trigger.ACTION_RELOAD, { status: null })
        throw exception
    }
}
