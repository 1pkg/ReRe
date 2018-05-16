import Axios from 'axios'

import Trigger from './trigger'

export default async (trigger, message) => {
    try {
        let state = trigger.state()
        let response = await Axios.post('report', {
            token: state.token,
            message: message,
        })
        trigger.push(Trigger.ACTION_REPORT, state)
        return state
    } catch (exception) {
        trigger.push(Trigger.ACTION_RELOAD, {})
        throw exception
    }
}
