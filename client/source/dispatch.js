import { Store, Url, History } from './helpers'
import Trigger from './actions/trigger'

export default trigger => {
    History.change(label => trigger.call(Trigger.ACTION_FETCH, label, false))

    let query = Url.parse().query
    if ('label' in query) {
        trigger.call(Trigger.ACTION_HANDSHAKE).then(() => {
            trigger.call(Trigger.ACTION_FETCH, query.label)
        })
        return
    }

    let state = Store.state()
    if (state !== undefined) {
        trigger.push('store', state)
        return
    }

    trigger.call(Trigger.ACTION_HANDSHAKE).then(() => {
        trigger.call(Trigger.ACTION_FETCH)
    })
}
