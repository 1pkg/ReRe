import { isEmpty } from 'lodash'

import Trigger from './trigger'
import { Device, Http } from '~/helpers'

export default async (trigger, wait = true) => {
    let state = trigger.state()
    if (wait) {
        state.status = Trigger.STATUS_WAIT
        trigger.push(Trigger.ACTION_WAIT, state)
    }

    state = trigger.state()
    if (!('lists' in state) || isEmpty(state.lists)) {
        let token = state.token
        state.lists = await Http.process(
            `${Trigger.ACTION_HOME}/${Device.pname()}`,
            { token },
            INTEGRITY,
        )
        trigger.push(Trigger.ACTION_HOME, state)
        state = trigger.state()
        let subjects = []
        for (let list in state.lists) {
            for (let task of state.lists[list]) {
                subjects.push(task.subject.link)
            }
        }
        state = await trigger.call(Trigger.ACTION_TRANSLATE, subjects, wait)
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
