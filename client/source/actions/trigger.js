import { clone } from 'lodash'

import {
    choose,
    devote,
    feedback,
    fetch,
    handshake,
    land,
    mark,
    remake,
    report,
    share,
    splash,
    stat,
    table,
} from '~/actions'
import { Analytic } from '~/helpers'

export default class Trigger {
    static STATUS_ACTIVE = 'status-active'
    static STATUS_CORRECT = 'status-correct'
    static STATUS_LAND = 'status-land'
    static STATUS_LOGIN = 'status-login'
    static STATUS_SPLASH = 'status-splash'
    static STATUS_TABLE = 'status-table'
    static STATUS_WAIT = 'status-wait'
    static STATUS_WRONG = 'status-wrong'
    static STATUS_ERROR = 'status-error'

    static ACTION_CHOOSE = 'action-choose'
    static ACTION_DEVOTE = 'action-devote'
    static ACTION_FEEDBACK = 'action-feedback'
    static ACTION_FETCH = 'action-fetch'
    static ACTION_HANDSHAKE = 'action-handshake'
    static ACTION_LAND = 'action-land'
    static ACTION_MARK = 'action-mark'
    static ACTION_REMAKE = 'action-remake'
    static ACTION_REPORT = 'action-report'
    static ACTION_SHARE = 'action-share'
    static ACTION_SPLASH = 'action-splash'
    static ACTION_STAT = 'action-stat'
    static ACTION_TABLE = 'action-table'

    static ACTION_STORE = 'action-store'
    static ACTION_RELOAD = 'action-reload'
    static ACTION_WAIT = 'action-wait'

    constructor(store) {
        this.store = store
        this.actions = {
            [Trigger.ACTION_CHOOSE]: choose,
            [Trigger.ACTION_DEVOTE]: devote,
            [Trigger.ACTION_FEEDBACK]: feedback,
            [Trigger.ACTION_FETCH]: fetch,
            [Trigger.ACTION_HANDSHAKE]: handshake,
            [Trigger.ACTION_LAND]: land,
            [Trigger.ACTION_MARK]: mark,
            [Trigger.ACTION_REMAKE]: remake,
            [Trigger.ACTION_REPORT]: report,
            [Trigger.ACTION_SHARE]: share,
            [Trigger.ACTION_SPLASH]: splash,
            [Trigger.ACTION_STAT]: stat,
            [Trigger.ACTION_TABLE]: table,
        }
    }

    state() {
        return clone(this.store.getState())
    }

    push(name, state) {
        this.store.dispatch({ type: name, name, state })
    }

    async call(name, ...params) {
        if (name in this.actions) {
            return (async () => {
                try {
                    return await this.actions[name](this, ...params)
                } catch (exception) {
                    Analytic.event(Analytic.EVENT_ERROR, exception)
                    this.push(Trigger.ACTION_RELOAD, {
                        status: Trigger.STATUS_ERROR,
                    })
                }
            })()
        }
        return async () => {}
    }
}
