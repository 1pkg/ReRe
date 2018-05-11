import Axios from 'axios'

import Trigger from './trigger'

export default async (trigger, message) => {
    let response = await Axios.post('report', {
        token: trigger.state().token,
        message: message,
    })
    let state = trigger.state()
    trigger.push(Trigger.ACTION_REPORT, state)
    return state
}
