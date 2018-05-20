import React from 'react'
import ReactDOM from 'react-dom'
import { compose as reduxCompose } from 'redux'
import { Provider } from 'react-redux'

import composer from './composer'
import dispatch from './dispatch'
import Main from './components/main'

let compose =
    process.env.NODE_ENV !== 'production' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
compose = compose ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : reduxCompose

let { store, trigger } = composer(compose)
dispatch(trigger)

let main = document.getElementById('main')
if (main instanceof Element) {
    ReactDOM.render(
        <Provider store={store}>
            <Main trigger={trigger} />
        </Provider>,
        main,
    )
}
