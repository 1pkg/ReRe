import Trigger from './trigger'
import { Http } from '~/helpers'

export default async trigger => {
    let state = trigger.state()
    state.status = Trigger.STATUS_WAIT
    trigger.push(Trigger.ACTION_WAIT, state)

    state = trigger.state()
    let token = state.token
    state.splash = await Http.process(Trigger.ACTION_SPLASH, { token }, token)
    trigger.push(Trigger.ACTION_SPLASH, state)
    state = await trigger.call(Trigger.ACTION_TRANSLATE, [
        state.splash.subject.link,
    ])
    state.status = Trigger.STATUS_SPLASH
    trigger.push(Trigger.ACTION_SPLASH, state)
    return state
}
