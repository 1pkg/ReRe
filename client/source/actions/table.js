import Lodash from 'lodash'
import Axios from 'axios'

import Trigger from './trigger'

export default async trigger => {
    let state = trigger.state()
    state.status = Trigger.STATUS_WAIT
    trigger.push(Trigger.ACTION_WAIT, state)

    state = trigger.state()
    if (!('table' in state) || Lodash.isEmpty(state.table)) {
        let response = await Axios.post('table', {
            token: state.token,
        })
        state.table = response.data.table
        state.table.total = response.data.total
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
