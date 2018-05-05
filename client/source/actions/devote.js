import Axios from 'axios'
import Qs from 'qs'

import Trigger from './trigger'

export default async trigger => {
    let response = await Axios.post(
        'devote',
        Qs.stringify({
            token: trigger.state().token,
        }),
    )
    let state = trigger.state()
    state.shaders = response.data.shaders
    state.settings = response.data.settings
    trigger.push(Trigger.ACTION_DEVOTE, state)
    return state
}
