import Axios from 'axios'
import Qs from 'qs'

import { Crypto, History, Json } from '~/helpers'
import Trigger from './trigger'

export default async trigger => {
    let response = await Axios.post(
        'remake',
        Qs.stringify({
            token: trigger.state().token,
        }),
    )
    let state = trigger.state()
    state.task = response.data
    state.task.subject = Crypto.decrypt(state.token, state.task.subject)
    state.task.subject = Json.decode(state.task.subject)
    History.push(state.task.label)
    trigger.push(Trigger.ACTION_REMAKE, state)
    return state
}
