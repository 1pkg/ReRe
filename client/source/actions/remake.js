import Trigger from './trigger'
import { Http } from '~/helpers'

export default async trigger => {
    let state = trigger.state()
    state.status = Trigger.STATUS_WAIT
    trigger.push(Trigger.ACTION_WAIT, state)

    state = trigger.state()
    let token = state.token
    state.task = await Http.process(Trigger.ACTION_REMAKE, { token }, token)
    state.task.handled = {}
    state.status = Trigger.STATUS_ACTIVE
    trigger.push(Trigger.ACTION_REMAKE, state)
    state = await trigger.call(Trigger.ACTION_STAT)
    return state
}
