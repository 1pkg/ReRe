import Axios from 'axios'

import Trigger from './trigger'

export default async trigger => {
    let response = await Axios.get(API.concat('report'), {
        params: { token: trigger.state().token },
    })
    let state = trigger.state()
    trigger.push(Trigger.ACTION_REPORT, state)
    return state
}
