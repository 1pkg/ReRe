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
        state.table = await Http.process(
            Trigger.ACTION_RATING,
            { token },
            INTEGRITY,
        )
    } else {
        await new Promise(resolve => {
            setTimeout(resolve)
        })
    }
    state.task = null
    state.status = Trigger.STATUS_RATING
    trigger.push(Trigger.STATUS_RATING, state)
    state = await trigger.call(Trigger.ACTION_NOTIFY)
    return state
}
