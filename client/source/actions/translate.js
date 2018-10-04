import { reduce } from 'lodash'

import Trigger from './trigger'
import { Http } from '~/helpers'

export default async (trigger, subjects) => {
    let state = trigger.state()
    let oldstatus = state.status
    state.status = Trigger.STATUS_WAIT
    trigger.push(Trigger.ACTION_WAIT, state)

    state = trigger.state()
    let refresh = reduce(
        subjects,
        (predicat, subject) => predicat || !(subject in state.blobs),
        false,
    )
    if (refresh) {
        let token = state.token
        let integrity = INTEGRITY
        state.blobs = Object.assign(
            state.blobs,
            await Http.process(
                Trigger.ACTION_TRANSLATE,
                { token, subjects },
                integrity,
            ),
        )
    }
    state.status = oldstatus
    trigger.push(Trigger.ACTION_TRANSLATE, state)
    return state
}
