import { History, Store, Url } from './helpers'
import Trigger from './actions/trigger'

export default async trigger => {
    let state = Store.state()
    if (state == null || !('token' in state)) {
        state = await trigger.call(Trigger.ACTION_HANDSHAKE)
    }
    if (!('settings' in state || 'shaders' in state)) {
        state = await trigger.call(Trigger.ACTION_DEVOTE)
    }

    let purl = Url.parse()
    if (
        state.status === Trigger.STATUS_ACTIVE ||
        state.status === Trigger.STATUS_CORRECT ||
        state.status === Trigger.STATUS_WRONG
    ) {
        trigger.push(Trigger.ACTION_STORE, state)
        History.push(state.task.label)
    } else if (
        state.status === Trigger.STATUS_LAND ||
        state.status === Trigger.STATUS_TABLE
    ) {
        trigger.push(Trigger.ACTION_STORE, state)
        History.push(state.status)
    } else if (purl && purl.query && 'l' in purl.query) {
        trigger.call(Trigger.ACTION_FETCH, purl.query.l)
    } else {
        trigger.call(Trigger.ACTION_LAND)
    }
}
