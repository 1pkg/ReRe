import { isEmpty } from 'lodash'

import Trigger from './trigger'
import { Device, Http } from '~/helpers'

export default async trigger => {
    let state = trigger.state()
    state.status = Trigger.STATUS_WAIT
    trigger.push(Trigger.ACTION_WAIT, state)

    state = trigger.state()
    let token = state.token
    let integrity = INTEGRITY
    state.splash = await Http.process(
        `${Trigger.ACTION_SPLASH}/${Device.name()}`,
        { token },
        integrity,
    )
    trigger.push(Trigger.ACTION_SPLASH, state)
    state = trigger.state()
    if (!isEmpty(state.splash)) {
        state = await trigger.call(Trigger.ACTION_TRANSLATE, [
            state.splash.subject.link,
        ])
    }
    state.status = Trigger.STATUS_SPLASH
    trigger.push(Trigger.ACTION_SPLASH, state)
    return state
}
