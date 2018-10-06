import { isEmpty } from 'lodash'

import Trigger from './trigger'
import { Device, Http, Identify } from '~/helpers'

export default async (trigger, alias, socialid = null) => {
    let state = trigger.state()
    let integrity = INTEGRITY
    let device = Device.name()
    let digest = await Identify.digest(alias, socialid)
    let uuid = await Identify.uuid(alias, socialid)
    let data = await Http.process(Trigger.ACTION_HANDSHAKE, {
        integrity,
        device,
        alias,
        digest,
        uuid,
    })
    if (isEmpty(data)) {
        trigger.push(Trigger.ACTION_RELOAD, {
            status: Trigger.STATUS_ERROR,
        })
        return state
    }
    state.alias = data.alias
    state.token = data.token
    state.status = Trigger.STATUS_WAIT
    trigger.push(Trigger.ACTION_HANDSHAKE, state)
    return state
}
