import Trigger from './trigger'
import { Http } from '~/helpers'

export default async (trigger, media) => {
    let state = trigger.state()
    let oldstatus = state.status
    state.status = Trigger.STATUS_WAIT
    trigger.push(Trigger.ACTION_WAIT, state)

    state = trigger.state()
    let token = state.token
    await Http.process(Trigger.ACTION_SHARE, { token, media })
    state.status = oldstatus
    trigger.push(Trigger.ACTION_SHARE, state)
    state = await trigger.call(Trigger.ACTION_SPECIFY)
    return state
}
