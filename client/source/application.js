import React from 'react'
import { render } from 'react-dom'
import { compose as reduxCompose } from 'redux'
import { Provider } from 'react-redux'

import { Env } from './helpers'
import composer from './composer'
import dispatch from './dispatch'
import Main from './components/main'

let compose = Env.development() && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
compose = compose ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : reduxCompose

export default () => {
    let { store, trigger } = composer(compose)
    dispatch(trigger)
    let main = document.getElementById('main')
    render(
        <Provider store={store}>
            <Main trigger={trigger} />
        </Provider>,
        main,
    )
}
