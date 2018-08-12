import Axios from 'axios'

import Trigger from './trigger'
import { Analytic, Device, Uuid } from '~/helpers'

export default async trigger => {
    try {
        let state = trigger.state()
        let response = await Axios.post('handshake', {
            integrity: INTEGRITY,
            alias: Uuid.alias(),
            uuid: Uuid.generate(),
            device: Device.name(),
        })
        state.alias = response.data.alias
        state.token = response.data.token
        state.stat = {
            score: response.data.score,
            frebie: response.data.frebie,
            factor: response.data.factor,
        }
        state.status = Trigger.STATUS_WAIT
        trigger.push(Trigger.ACTION_HANDSHAKE, state)
        return state
    } catch (exception) {
        Analytic.event(Analytic.EVENT_ERROR, exception)
        trigger.push(Trigger.ACTION_RELOAD, { status: Trigger.STATUS_ERROR })
        throw exception
    }
}
