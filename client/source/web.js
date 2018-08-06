import { Env, Url } from './helpers'
import application from './application'
import { coinimp } from './thirdparty'

import ReactGA from 'react-ga'

window.addEventListener(
    'load',
    () => {
        application()

        if (Env.production()) {
            coinimp(COINIMP_KEY)

            ReactGA.initialize(GA_CODE)
            ReactGA.pageview(Url.current())
        }
    },
    { once: true },
)
