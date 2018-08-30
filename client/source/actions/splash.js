import Trigger from './trigger'
import { Http } from '~/helpers'

export default async trigger => {
    let state = trigger.state()
    state.status = Trigger.STATUS_WAIT
    trigger.push(Trigger.ACTION_WAIT, state)

    state = trigger.state()
    let token = state.token
    state.splash = await Http.process(Trigger.ACTION_SPLASH, { token }, token)
    state.status = Trigger.STATUS_SPLASH
    trigger.push(Trigger.ACTION_SPLASH, state)
    return state
}
