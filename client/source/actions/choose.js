import Trigger from './trigger'
import { Http } from '~/helpers'

export default async (trigger, option) => {
    let state = trigger.state()
    state.status = Trigger.STATUS_WAIT
    trigger.push(Trigger.ACTION_WAIT, state)

    state = trigger.state()
    let token = state.token
    let data = await Http.process(
        Trigger.ACTION_CHOOSE,
        { token, option },
        token,
    )
    state.option = data.option
    state.timestamp = null
    state.status = data.result ? Trigger.STATUS_CORRECT : Trigger.STATUS_WRONG
    trigger.push(Trigger.ACTION_CHOOSE, state)
    state = await trigger.call(Trigger.ACTION_STAT)
    return state
}
