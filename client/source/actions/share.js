import Axios from 'axios'

import Trigger from './trigger'

export default async (trigger, media) => {
    let state = trigger.state()
    let oldstatus = state.status
    state.status = Trigger.STATUS_WAIT
    trigger.push(Trigger.ACTION_WAIT, state)

    state = trigger.state()
    let response = await Axios.post('share', {
        token: state.token,
        media,
    })
    state.stat.frebie = response.data.frebie
    state.status = oldstatus
    trigger.push(Trigger.ACTION_SHARE, state)
    return state
}
