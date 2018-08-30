import Trigger from './trigger'
import { Http } from '~/helpers'

export default async trigger => {
    let state = trigger.state()
    let token = state.token
    state.stat = await Http.process(Trigger.ACTION_STAT, { token }, token)
    trigger.push(Trigger.ACTION_STAT, state)
    return state
}
