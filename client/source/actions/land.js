import Axios from 'axios'

import { Crypto, History, Json } from '~/helpers'
import Trigger from './trigger'

export default async trigger => {
    try {
        let state = trigger.state()
        state.status = Trigger.STATUS_WAIT
        trigger.push(Trigger.ACTION_WAIT, state)

        state = trigger.state()
        let response = await Axios.post('land', {
            token: state.token,
        })
        state.lists = response.data
        for (let land in state.lists) {
            for (let task of state.lists[land]) {
                task.subject = Crypto.decrypt(state.token, task.subject)
                task.subject = Json.decode(task.subject)
            }
        }
        state.status = Trigger.STATUS_LAND
        History.push()
        trigger.push(Trigger.ACTION_LAND, state)
        return state
    } catch (exception) {
        trigger.push(Trigger.ACTION_RELOAD, { status: null })
        throw exception
    }
}
