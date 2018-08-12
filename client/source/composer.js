import { applyMiddleware, createStore } from 'redux'
import ReduxThunk from 'redux-thunk'

import { History, Store } from './helpers'
import Trigger from './actions/trigger'

const history = trigger => {
    History.change(breadcrumb => {
        if (breadcrumb == Trigger.STATUS_LAND) {
            trigger.call(Trigger.ACTION_LAND, false)
        } else if (breadcrumb == Trigger.STATUS_TABLE) {
            trigger.call(Trigger.ACTION_TABLE, false)
        } else {
            trigger.call(Trigger.ACTION_FETCH, breadcrumb, false)
        }
    })
}

export default compose => {
    let store = createStore((state = {}, action) => {
        if ('data' in action && action.data) {
            trigger.call(action.name, ...Object.values(action.data))
            return state
        }

        if ('state' in action && action.state) {
            Store.update(action.state)
            return action.state
        }

        return state
    }, compose(applyMiddleware(ReduxThunk)))
    let trigger = new Trigger(store)
    history(trigger)
    return { store, trigger }
}
