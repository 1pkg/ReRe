import ReactGA from 'react-ga'

import { Env, Json } from './'

export default class self {
    static initialized = false

    static EVENT_FIT = 'fit'
    static EVENT_CLICK = 'click'
    static EVENT_SWIPE = 'swipe'
    static EVENT_TIMEOUT = 'timeout'
    static EVENT_ERROR = 'error'

    static VIEW_LAND = 'land'
    static VIEW_LOGIN = 'login'
    static VIEW_TABLE = 'table'
    static VIEW_CHOOSE = 'choose'
    static VIEW_RESULT = 'result'
    static VIEW_MAINTENANCE = 'maintenance'
    static VIEW_SPLASH = 'splash'
    static VIEW_UPDATE = 'update'
    static VIEW_WAIT = 'wait'

    static view(view) {
        if (self.initialize()) {
            if (Env.web()) {
                ReactGA.pageview(view)
            } else {
                window.ga.trackView(view)
            }
        }
    }

    static event(name, payload = {}) {
        if (self.initialize()) {
            if (Env.web()) {
                ReactGA.event({
                    category: 'event',
                    action: name,
                    label: Json.encode(payload),
                })
            } else {
                window.ga.trackEvent('event', name, Json.encode(payload))
            }
        }
    }

    static initialize() {
        if (Env.production()) {
            if (!self.initialized) {
                if (Env.web()) {
                    ReactGA.initialize(GA_CODE)
                } else {
                    window.ga.startTrackerWithId(GA_CODE)
                }
                self.initialized = true
            }
            return true
        }
        return false
    }
}
