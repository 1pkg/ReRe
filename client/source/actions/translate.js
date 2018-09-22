import { reduce } from 'lodash'

import Trigger from './trigger'
import { Http } from '~/helpers'

export default async (trigger, subjects) => {
    let state = trigger.state()
    state.status = Trigger.STATUS_WAIT
    trigger.push(Trigger.ACTION_WAIT, state)

    state = trigger.state()
    let token = state.token
    let refresh = reduce(
        subjects,
        (predicat, subject) => predicat || !(subject in state.blobs),
        false,
    )
    if (refresh) {
        state.blobs = Object.assign(
            state.blobs,
            await Http.process(
                Trigger.ACTION_TRANSLATE,
                { token, subjects },
                token,
            ),
        )
    }
    trigger.push(Trigger.ACTION_TRANSLATE, state)
    return state
}
