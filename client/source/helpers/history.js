import BrowserHistory from 'history/createBrowserHistory'
import NativeHistory from 'history/createMemoryHistory'

import { Env } from './'
import Trigger from '~/actions/trigger'

export default class self {
    static history = Env.cordova() ? new NativeHistory() : new BrowserHistory()

    static ROUTE_HOME = 'home'
    static ROUTE_RATING = 'rating'
    static ROUTE_RECT = 'rect'

    static push(label) {
        if (label == Trigger.STATUS_LAND) {
            self.history.push(`/${self.ROUTE_HOME}`, {
                location: Trigger.STATUS_LAND,
            })
        } else if (label == Trigger.STATUS_TABLE) {
            self.history.push(`/${self.ROUTE_RATING}`, {
                location: Trigger.STATUS_TABLE,
            })
        } else {
            self.history.push(`/${self.ROUTE_RECT}/?l=${label}`, { label })
        }
    }

    static change(handler) {
        return self.history.listen((location, action) => {
            if (action !== 'POP') {
                return
            }

            if (location.state && 'label' in location.state) {
                handler(location.state.label)
            } else {
                handler(location.state.location)
            }
        })
    }
}
