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

    let query = Url.parse().query
    if (
        state.status === Trigger.STATUS_ACTIVE ||
        state.status === Trigger.STATUS_CORRECT ||
        state.status === Trigger.STATUS_WRONG
    ) {
        trigger.push(Trigger.ACTION_STORE, state)
        History.push(state.task.label)
    } else if (state.status === Trigger.STATUS_LAND) {
        trigger.push(Trigger.ACTION_STORE, state)
        History.push()
    } else if ('l' in query) {
        trigger.call(Trigger.ACTION_FETCH, query.l)
    } else {
        trigger.call(Trigger.ACTION_LAND)
    }
}
