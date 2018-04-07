import Lodash from 'lodash'
import * as Redux from 'redux'

import Choose from './choose'
import Fetch from './fetch'
import Handshake from './handshake'
import Redo from './redo'

export default class Trigger {
    static STATUS_ACTIVE = 'status-active'
    static STATUS_CORRECT = 'status-correct'
    static STATUS_WRONG = 'status-wrong'

    static ACTION_CHOOSE = 'action-chose'
    static ACTION_FETCH = 'action-fetch'
    static ACTION_HANDSHAKE = 'action-handshake'
    static ACTION_REDO = 'action-redo'

    constructor(store) {
        this.store = store
        this.actions = {
            [Trigger.ACTION_CHOOSE]: Choose,
            [Trigger.ACTION_FETCH]: Fetch,
            [Trigger.ACTION_HANDSHAKE]: Handshake,
            [Trigger.ACTION_REDO]: Redo,
        }
    }

    state() {
        return Lodash.clone(this.store.getState())
    }

    call(name, ...params) {
        if (name in this.actions) {
            return this.actions[name](this, ...params)
        }
        return new Promise((resolve, reject) => reject())
    }

    push(name, state) {
        this.store.dispatch({ type: name, name, state })
    }
}
