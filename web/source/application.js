// @flow

import React from 'react'
import ReactDOM from 'react-dom'
import * as Redux from 'redux'
import * as ReactRedux from 'react-redux'
import ReduxThunk from 'redux-thunk'

import * as Model from './model'
import Trigger from './actions/trigger'

import Main from './components/main'

type Action = {
    type: string,
    state: Model.State,
    data: any,
}

let trigger: Trigger
let compose: Redux.compose
if (
    process.env.NODE_ENV !== 'production' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) {
    compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
} else {
    compose = Redux.compose
}
let store: Redux.Store = Redux.createStore(
    (state: ?Model.State = null, action: Action): ?Model.State => {
        if (action.data) {
            trigger.call(action.type, ...Object.values(action.data))
            return state
        } else {
            return action.state ? action.state : state
        }
    },
    compose(Redux.applyMiddleware(ReduxThunk)),
)
trigger = new Trigger(store)
trigger.call(Trigger.ACTION_IDENTIFY)

let main = document.getElementById('main')
if (main instanceof Element) {
    ReactDOM.render(
        <ReactRedux.Provider store={store}>
            <Main trigger={trigger} />
        </ReactRedux.Provider>,
        main,
    )
}
