import { reduce } from 'lodash'

import Trigger from './trigger'
import { Hash, Http } from '~/helpers'

let self = async (trigger, subjects, stateless = false) => {
    let state = trigger.state()
    let oldstatus = state.status
    if (!stateless) {
        state.status = Trigger.STATUS_WAIT
        trigger.push(Trigger.ACTION_WAIT, state)
        state = trigger.state()
    }

    let refresh = reduce(
        subjects,
        (predicat, subject) => predicat || !(subject in self.blobs),
        false,
    )
    if (refresh) {
        let token = state.token
        self.blobs = Object.assign(
            self.blobs,
            await Http.process(
                `${Trigger.ACTION_TRANSLATE}/${Hash.sha3(subjects.join('|'))}`,
                { token, subjects },
                INTEGRITY,
            ),
        )
    }

    if (!stateless) {
        state.blobs = self.blobs
        state.status = oldstatus
        trigger.push(Trigger.ACTION_TRANSLATE, state)
        return state
    }
    return self.blobs
}
self.blobs = {}
export default self
