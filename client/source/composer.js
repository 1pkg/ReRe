import { clone } from 'lodash'
import { applyMiddleware, createStore } from 'redux'
import ReduxThunk from 'redux-thunk'

import { History, Store } from './helpers'
import Trigger from './actions/trigger'

const history = trigger => {
    History.change(breadcrumb => {
        if (breadcrumb == Trigger.STATUS_HOME) {
            trigger.call(Trigger.ACTION_HOME)
        } else if (breadcrumb == Trigger.STATUS_RATING) {
            trigger.call(Trigger.ACTION_RATING)
        } else {
            trigger.call(Trigger.ACTION_FETCH, breadcrumb)
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
            let ststate = clone(action.state)
            ststate.blobs = {}
            Store.update(ststate)
            return action.state
        }

        return state
    }, compose(applyMiddleware(ReduxThunk)))
    let trigger = new Trigger(store)
    history(trigger)
    return { store, trigger }
}
