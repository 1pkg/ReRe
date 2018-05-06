import Lodash from 'lodash'
import Axios from 'axios'

import Choose from './choose'
import Devote from './devote'
import Fetch from './fetch'
import Handshake from './handshake'
import Land from './land'
import Remake from './remake'
import Report from './report'

export default class Trigger {
    static STATUS_ACTIVE = 'status-active'
    static STATUS_CORRECT = 'status-correct'
    static STATUS_WRONG = 'status-wrong'

    static ACTION_CHOOSE = 'action-chose'
    static ACTION_DEVOTE = 'action-devote'
    static ACTION_FETCH = 'action-fetch'
    static ACTION_HANDSHAKE = 'action-handshake'
    static ACTION_LAND = 'action-land'
    static ACTION_REMAKE = 'action-remake'
    static ACTION_REPORT = 'action-report'

    constructor(store) {
        this.store = store
        this.actions = {
            [Trigger.ACTION_CHOOSE]: Choose,
            [Trigger.ACTION_DEVOTE]: Devote,
            [Trigger.ACTION_FETCH]: Fetch,
            [Trigger.ACTION_HANDSHAKE]: Handshake,
            [Trigger.ACTION_LAND]: Land,
            [Trigger.ACTION_REMAKE]: Remake,
            [Trigger.ACTION_REPORT]: Report,
        }
        Axios.defaults.baseURL = API
        Axios.defaults.headers.post['Content-Type'] = POST_CONTENT_TYPE
    }

    state() {
        return Lodash.clone(this.store.getState())
    }

    push(name, state) {
        this.store.dispatch({ type: name, name, state })
    }

    async call(name, ...params) {
        if (name in this.actions) {
            try {
                return this.actions[name](this, ...params)
            } catch (exception) {
                this.push('reload', {})
            }
        }
        return async () => {}
    }
}
