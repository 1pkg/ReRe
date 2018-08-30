import Trigger from './trigger'
import { Http } from '~/helpers'

export default async (trigger, message) => {
    let state = trigger.state()
    let oldstatus = state.status
    state.status = Trigger.STATUS_WAIT
    trigger.push(Trigger.ACTION_WAIT, state)

    state = trigger.state()
    let token = state.token
    await Http.process(Trigger.ACTION_FEEDBACK, { token, message })
    state.status = oldstatus
    trigger.push(Trigger.ACTION_FEEDBACK, state)
    return state
}
