import Axios from 'axios'

import Trigger from './trigger'

export default async trigger => {
    let response = await Axios.get(API.concat('devote'), {
        params: { token: trigger.state().token },
    })
    let state = trigger.state()
    state.shaders = response.data.shaders
    state.settings = response.data.settings
    trigger.push(Trigger.ACTION_DEVOTE, state)
    return state
}
