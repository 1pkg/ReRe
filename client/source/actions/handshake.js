import Trigger from './trigger'
import { Device, Http, Uuid } from '~/helpers'

export default async trigger => {
    let state = trigger.state()
    let data = await Http.process(Trigger.ACTION_HANDSHAKE, {
        integrity: INTEGRITY,
        alias: Uuid.alias(),
        uuid: Uuid.generate(),
        device: Device.name(),
    })
    state.alias = data.alias
    state.token = data.token
    state.status = Trigger.STATUS_WAIT
    trigger.push(Trigger.ACTION_HANDSHAKE, state)
    return state
}
