import { Env } from './helpers'
import application from './application'
import { advertising } from './thirdparty'

document.addEventListener(
    'deviceready',
    () => {
        application()

        if (Env.production()) {
            advertising(ADMOB_CODE)

            window.ga.startTrackerWithId(GA_CODE)
            window.ga.trackView('view')
        }
    },
    { once: true },
)
