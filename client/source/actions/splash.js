import Axios from 'axios'

import Trigger from './trigger'
import { Crypto, Json } from '~/helpers'

export default async trigger => {
    let state = trigger.state()
    state.status = Trigger.STATUS_WAIT
    trigger.push(Trigger.ACTION_WAIT, state)

    state = trigger.state()
    let response = await Axios.post('splash', {
        token: state.token,
    })
    state.splash = response.data.splash
    if (state.splash) {
        state.splash.subject = Crypto.decrypt(state.token, state.splash.subject)
        state.splash.subject = Json.decode(state.splash.subject)
    }
    state.status = Trigger.STATUS_SPLASH
    trigger.push(Trigger.ACTION_SPLASH, state)
    return state
}
