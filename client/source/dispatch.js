import { Store, Url } from './helpers'
import Trigger from './actions/trigger'

export default async trigger => {
    let state = Store.state()
    if (state == null || !'token' in state) {
        state = await trigger.call(Trigger.ACTION_HANDSHAKE)
    }
    if (!('settings' in state || 'shaders' in state)) {
        state = await trigger.call(Trigger.ACTION_DEVOTE)
    }

    let query = Url.parse().query
    if (state.status != null) {
        trigger.push('store', state)
    } else if ('label' in query) {
        await trigger.call(Trigger.ACTION_FETCH, query.label)
    } else {
        await trigger.call(Trigger.ACTION_FETCH)
    }
}
