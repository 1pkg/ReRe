import Trigger from './trigger'
import { Http } from '~/helpers'

export default async (trigger, type) => {
    let state = trigger.state()
    let oldstatus = state.status
    state.status = Trigger.STATUS_WAIT
    trigger.push(Trigger.ACTION_WAIT, state)

    state = trigger.state()
    let token = state.token
    await Http.process(Trigger.ACTION_MARK, { token, type })
    state.task.handled[type] = true
    state.status = oldstatus
    trigger.push(Trigger.ACTION_MARK, state)
    return state
}
