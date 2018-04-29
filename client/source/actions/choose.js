import Axios from 'axios'

import Trigger from './trigger'

export default async (trigger, option) => {
    let response = await Axios.get(API.concat('choose'), {
        params: { token: trigger.state().token, option: option },
    })
    let state = trigger.state()
    state.option = response.data.option
    state.timestamp = null
    state.status = response.data.result
        ? Trigger.STATUS_CORRECT
        : Trigger.STATUS_WRONG
    trigger.push(Trigger.ACTION_CHOOSE, state)
    return state
}
