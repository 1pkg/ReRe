import Lodash from 'lodash'
import Axios from 'axios'

import Trigger from './trigger'
import { Analytic, Crypto, History, Json } from '~/helpers'

export default async trigger => {
    try {
        let state = trigger.state()
        state.status = Trigger.STATUS_WAIT
        trigger.push(Trigger.ACTION_WAIT, state)

        state = trigger.state()
        if (!('lists' in state) || Lodash.isEmpty(state.lists)) {
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
        } else {
            await new Promise(resolve => {
                setTimeout(resolve)
            })
        }
        state.task = null
        state.status = Trigger.STATUS_LAND
        History.push()
        trigger.push(Trigger.ACTION_LAND, state)
        return state
    } catch (exception) {
        Analytic.event(Analytic.EVENT_ERROR, exception)
        trigger.push(Trigger.ACTION_RELOAD, { status: Trigger.STATUS_ERROR })
        throw exception
    }
}
