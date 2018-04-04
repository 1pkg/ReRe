import React from 'react'
import ReactDOM from 'react-dom'
import * as Redux from 'redux'
import * as ReactRedux from 'react-redux'
import ReduxThunk from 'redux-thunk'

import { Store, Url } from './helpers'
import Trigger from './actions/trigger'
import Main from './components/main'

let compose =
    process.env.NODE_ENV !== 'production' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
compose = compose ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : Redux.compose

let store = Redux.createStore((state = null, action) => {
    if ('data' in action && action.data) {
        trigger.call(action.name, ...Object.values(action.data))
        return state
    }

    if ('state' in action && action.state) {
        Store.update(action.state)
        return action.state
    }

    return state
}, compose(Redux.applyMiddleware(ReduxThunk)))
let trigger = new Trigger(store)

let dispatch = trigger => {
    let state = Store.state()
    if (state) {
        trigger.push('store', state)
        return
    }

    trigger.call(Trigger.ACTION_HANDSHAKE).then(() => {
        let url = Url.parse()
        if ('task' in url.query) {
            trigger.call(Trigger.ACTION_FETCH, url.query.task)
        } else {
            trigger.call(Trigger.ACTION_FETCH)
        }
    })
}
dispatch(trigger)

let main = document.getElementById('main')
if (main instanceof Element) {
    ReactDOM.render(
        <ReactRedux.Provider store={store}>
            <Main trigger={trigger} />
        </ReactRedux.Provider>,
        main,
    )
}
