import Trigger from './trigger'
import { Http, Timestamp } from '~/helpers'

export default async (trigger, label = '') => {
    let state = trigger.state()
    state.status = Trigger.STATUS_WAIT
    trigger.push(Trigger.ACTION_WAIT, state)

    state = trigger.state()
    let token = state.token
    state.task = await Http.process(
        Trigger.ACTION_FETCH,
        { token, label },
        token,
    )
    state.task.handled = {}
    state.option = null
    state.timestamp = Timestamp.current()
    state.status = Trigger.STATUS_ACTIVE
    trigger.push(Trigger.ACTION_FETCH, state)
    state = await trigger.call(Trigger.ACTION_SPECIFY)
    return state
}
