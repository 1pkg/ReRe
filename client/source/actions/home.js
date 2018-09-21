import { isEmpty } from 'lodash'

import Trigger from './trigger'
import { Http } from '~/helpers'

export default async trigger => {
    let state = trigger.state()
    state.status = Trigger.STATUS_WAIT
    trigger.push(Trigger.ACTION_WAIT, state)

    state = trigger.state()
    if (!('lists' in state) || isEmpty(state.lists)) {
        let token = state.token
        state.lists = await Http.process(Trigger.ACTION_HOME, { token }, token)
    } else {
        await new Promise(resolve => {
            setTimeout(resolve)
        })
    }
    state.task = null
    state.status = Trigger.STATUS_HOME
    trigger.push(Trigger.ACTION_HOME, state)
    state = await trigger.call(Trigger.ACTION_NOTIFY)
    return state
}
