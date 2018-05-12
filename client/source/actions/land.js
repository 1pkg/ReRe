import Axios from 'axios'

import { Crypto, Json } from '~/helpers'
import Trigger from './trigger'

export default async trigger => {
    let response = await Axios.post('land', {
        token: trigger.state().token,
    })
    let state = trigger.state()
    state.lists = response.data
    for (let land in state.lists) {
        for (let task of state.lists[land]) {
            task.subject = Crypto.decrypt(state.token, task.subject)
            task.subject = Json.decode(task.subject)
        }
    }
    state.status = Trigger.STATUS_LAND
    trigger.push(Trigger.ACTION_LAND, state)
    return state
}
