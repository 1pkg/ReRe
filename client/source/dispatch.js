import { Store, Url } from './helpers'
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
    if (state.status != null && state.status != Trigger.STATUS_WAIT) {
        trigger.push(Trigger.ACTION_STORE, state)
    } else if ('l' in query) {
        trigger.call(Trigger.ACTION_FETCH, query.l)
    } else {
        trigger.call(Trigger.ACTION_LAND)
    }
}
