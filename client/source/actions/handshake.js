import Axios from 'axios'

import Trigger from './trigger'

export default async trigger => {
    try {
        let state = trigger.state()
        let response = await Axios.post('handshake')
        state.token = response.data.token
        state.orientation = response.data.orientation
        state.status = null
        trigger.push(Trigger.ACTION_HANDSHAKE, state)
        return state
    } catch (exception) {
        trigger.push(Trigger.ACTION_RELOAD, {})
        throw exception
    }
}
