import Trigger from './trigger'
import { Http } from '~/helpers'

export default async trigger => {
    let state = trigger.state()
    let token = state.token
    state.stats = await Http.process(Trigger.ACTION_SPECIFY, { token }, token)
    trigger.push(Trigger.ACTION_SPECIFY, state)
    return state
}
