import Axios from 'axios'

import Trigger from './trigger'
import { Device, Uuid } from '~/helpers'

export default async trigger => {
    let state = trigger.state()
    let response = await Axios.post('handshake', {
        alias: Uuid.alias(),
        uuid: Uuid.generate(),
        device: Device.name(),
    })
    state.alias = response.data.alias
    state.token = response.data.token
    state.stat = response.data.stat
    state.status = Trigger.STATUS_WAIT
    trigger.push(Trigger.ACTION_HANDSHAKE, state)
    return state
}
