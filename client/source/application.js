import React from 'react'
import ReactDOM from 'react-dom'
import * as Redux from 'redux'
import * as ReactRedux from 'react-redux'
import ReduxThunk from 'redux-thunk'
import UrlParse from 'url-parse'
import Store from 'store'
import ExpireStorePlugin from 'store/plugins/expire'

import * as Constants from './constants'
import Trigger from './actions/trigger'

import Main from './components/main'

let compose =
    process.env.NODE_ENV !== 'production' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
compose = compose ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : Redux.compose
Store.addPlugin(ExpireStorePlugin)

let store = Redux.createStore((state = null, action) => {
    if (action.data) {
        trigger.call(action.name, ...Object.values(action.data))
        return action.state ? action.state : state
    }
    Store.set(
        Constants.STORE_STATE_KEY,
        action.state,
        Constants.STORE_STATE_EXPIRE,
    )
    return action.state ? action.state : state
}, compose(Redux.applyMiddleware(ReduxThunk)))
let trigger = new Trigger(store)

let dispatch = trigger => {
    let state = Store.get(Constants.STORE_STATE_KEY)
    if (!state) {
        trigger.call(Trigger.ACTION_HANDSHAKE).then(() => {
            let urlData = UrlParse(window.location, true)
            if (urlData.query && 'task' in urlData.query) {
                trigger.call(Trigger.ACTION_FETCH, urlData.query.task)
            } else {
                trigger.call(Trigger.ACTION_FETCH)
            }
        })
        return
    }
    trigger.push(null, state)
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
