import Trigger from './trigger'
import { Device, Http, Identify } from '~/helpers'

export default async (trigger, alias) => {
    let state = trigger.state()
    let integrity = INTEGRITY
    let device = Device.name()
    let digest = await Identify.digest()
    let uuid = await Identify.uuid()
    alias = alias ? alias : Identify.alias()
    let data = await Http.process(Trigger.ACTION_HANDSHAKE, {
        integrity,
        device,
        alias,
        digest,
        uuid,
    })
    state.alias = data.alias
    state.token = data.token
    state.status = Trigger.STATUS_WAIT
    trigger.push(Trigger.ACTION_HANDSHAKE, state)
    return state
}
