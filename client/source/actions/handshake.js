import Axios from 'axios'

import Trigger from './trigger'

export default async trigger => {
    let response = await Axios.get(API.concat('handshake'), { params: {} })
    let state = trigger.state()
    state.token = response.data.token
    state.mobile = response.data.mobile
    state.status = null
    trigger.push(Trigger.ACTION_HANDSHAKE, state)
    return state
}
