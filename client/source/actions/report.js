import Axios from 'axios'
import Qs from 'qs'

import Trigger from './trigger'

export default async (trigger, message) => {
    let response = await Axios.post(
        'report',
        Qs.stringify({
            token: trigger.state().token,
            message: message,
        }),
    )
    let state = trigger.state()
    trigger.push(Trigger.ACTION_REPORT, state)
    return state
}
