import Lodash from 'lodash'
import Axios from 'axios'

import {
    Choose,
    Devote,
    Fetch,
    Handshake,
    Land,
    Mark,
    Remake,
    Report,
} from '~/actions'

export default class Trigger {
    static STATUS_ACTIVE = 'status-active'
    static STATUS_CORRECT = 'status-correct'
    static STATUS_LAND = 'status-land'
    static STATUS_WAIT = 'status-wait'
    static STATUS_WRONG = 'status-wrong'

    static ACTION_CHOOSE = 'action-chose'
    static ACTION_DEVOTE = 'action-devote'
    static ACTION_FETCH = 'action-fetch'
    static ACTION_HANDSHAKE = 'action-handshake'
    static ACTION_LAND = 'action-land'
    static ACTION_MARK = 'action-mark'
    static ACTION_REMAKE = 'action-remake'
    static ACTION_REPORT = 'action-report'

    static ACTION_STORE = 'action-store'
    static ACTION_RELOAD = 'action-reload'
    static ACTION_WAIT = 'action-wait'

    constructor(store) {
        this.store = store
        this.actions = {
            [Trigger.ACTION_CHOOSE]: Choose,
            [Trigger.ACTION_DEVOTE]: Devote,
            [Trigger.ACTION_FETCH]: Fetch,
            [Trigger.ACTION_HANDSHAKE]: Handshake,
            [Trigger.ACTION_LAND]: Land,
            [Trigger.ACTION_MARK]: Mark,
            [Trigger.ACTION_REMAKE]: Remake,
            [Trigger.ACTION_REPORT]: Report,
        }
        Axios.defaults.baseURL = API_URL
        Axios.defaults.timeout = API_TIMEOUT
        Axios.defaults.maxContentLength = API_CONTENT_LENGTH
        Axios.defaults.headers.post['Cache-Control'] = API_CACHE_CONTROL
    }

    state() {
        return Lodash.clone(this.store.getState())
    }

    push(name, state) {
        this.store.dispatch({ type: name, name, state })
    }

    async call(name, ...params) {
        if (name in this.actions) {
            return this.actions[name](this, ...params)
        }
        return async () => {}
    }
}
