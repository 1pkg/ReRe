import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'

import { Store } from './helpers'
import Trigger from './actions/trigger'

export default compose => {
    let store = createStore((state = null, action) => {
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
    return { store, trigger }
}
