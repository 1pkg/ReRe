import Axios from 'axios'

import { Crypto, History, Json } from '~/helpers'
import Trigger from './trigger'

export default async trigger => {
    try {
        let state = trigger.state()
        let response = await Axios.post('remake', {
            token: state.token,
        })
        state.task = response.data
        state.task.subject = Crypto.decrypt(state.token, state.task.subject)
        state.task.subject = Json.decode(state.task.subject)
        state.task.handled = {}
        History.push(state.task.label)
        trigger.push(Trigger.ACTION_REMAKE, state)
        return state
    } catch (exception) {
        trigger.push(Trigger.ACTION_RELOAD, {})
        throw exception
    }
}
