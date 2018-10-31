import BrowserHistory from 'history/createBrowserHistory'
import NativeHistory from 'history/createMemoryHistory'

import Trigger from '~/actions/trigger'
import { Env } from './'

export default class self {
    static history = Env.cordova() ? new NativeHistory() : new BrowserHistory()
    static prev = null

    static ROUTE_HOME = '/home'
    static ROUTE_RATING = '/rating'
    static ROUTE_TASK = '/task'
    static ROUTE_LOGIN = '/login'

    static push(label) {
        if (label != self.prev) {
            if (label == Trigger.STATUS_HOME) {
                self.history.push(self.ROUTE_HOME, {
                    location: Trigger.STATUS_HOME,
                })
            } else if (label == Trigger.STATUS_RATING) {
                self.history.push(self.ROUTE_RATING, {
                    location: Trigger.STATUS_RATING,
                })
            } else if (label == Trigger.STATUS_LOGIN) {
                self.history.push(self.ROUTE_LOGIN, {
                    location: Trigger.STATUS_LOGIN,
                })
            } else {
                self.history.push(`${self.ROUTE_TASK}/?l=${label}`, { label })
            }
            self.prev = label
        }
    }

    static change(handler) {
        return self.history.listen((location, action) => {
            if (action !== 'POP') {
                return
            }

            if (location.state && 'label' in location.state) {
                self.prev = location.state.label
                handler(location.state.label)
            } else if (location.state && 'location' in location.state) {
                self.prev = location.state.location
                handler(location.state.location)
            } else {
                self.prev = Trigger.STATUS_LOGIN
                handler(Trigger.STATUS_LOGIN)
            }
        })
    }
}
