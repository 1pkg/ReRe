import React from 'react'
import ReactDOM from 'react-dom'
import { compose as reduxCompose } from 'redux'
import { Provider } from 'react-redux'

import coinimp from './thirdparty/coinimp'
import statcounter from './thirdparty/statcounter'

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
ReactDOM.render(
    <Provider store={store}>
        <Main trigger={trigger} />
    </Provider>,
    main,
)

if (process.env.NODE_ENV === 'production') {
    coinimp(COINIMP_KEY)
    statcounter(STARCOUNTER_PROJECT, STARCOUNTER_SECURITY)
}
