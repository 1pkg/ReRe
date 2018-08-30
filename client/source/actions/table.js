import { isEmpty } from 'lodash'

import Trigger from './trigger'
import { Http } from '~/helpers'

export default async trigger => {
    let state = trigger.state()
    state.status = Trigger.STATUS_WAIT
    trigger.push(Trigger.ACTION_WAIT, state)

    state = trigger.state()
    if (!('table' in state) || isEmpty(state.table)) {
        let token = state.token
        let data = await Http.process(Trigger.ACTION_TABLE, { token }, token)
        state.table = data.table
        state.table.total = data.total
    } else {
        await new Promise(resolve => {
            setTimeout(resolve)
        })
    }
    state.task = null
    state.status = Trigger.STATUS_TABLE
    trigger.push(Trigger.STATUS_TABLE, state)
    return state
}
