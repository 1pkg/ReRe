import Axios from 'axios'

import Trigger from './trigger'

export default async trigger => {
    let response = await Axios.post('handshake')
    let state = trigger.state()
    state.token = response.data.token
    state.orientation = response.data.orientation
    state.status = null
    trigger.push(Trigger.ACTION_HANDSHAKE, state)
    return state
}
