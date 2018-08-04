import BrowserHistory from 'history/createBrowserHistory'
import NativeHistory from 'history/createMemoryHistory'

import Env from './env'

export default class self {
    static history = Env.cordova() ? new NativeHistory() : new BrowserHistory()

    static push(label) {
        if (label) {
            self.history.push(`/rect/?l=${label}`, { label })
        } else {
            self.history.push(`/home`, {})
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
                handler(undefined)
            }
        })
    }
}
