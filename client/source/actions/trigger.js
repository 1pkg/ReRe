import { clone } from 'lodash'

import {
    choose,
    devote,
    feedback,
    fetch,
    handshake,
    home,
    mark,
    notify,
    rating,
    remake,
    report,
    share,
    specify,
    splash,
    translate,
} from '~/actions'
import { Analytic, Revenue } from '~/helpers'

export default class Trigger {
    static STATUS_ACTIVE = 'status-active'
    static STATUS_CORRECT = 'status-correct'
    static STATUS_HOME = 'status-home'
    static STATUS_LOGIN = 'status-login'
    static STATUS_RATING = 'status-rating'
    static STATUS_SPLASH = 'status-splash'
    static STATUS_WAIT = 'status-wait'
    static STATUS_WRONG = 'status-wrong'
    static STATUS_ERROR = 'status-error'

    static ACTION_CHOOSE = 'action-choose'
    static ACTION_DEVOTE = 'action-devote'
    static ACTION_FEEDBACK = 'action-feedback'
    static ACTION_FETCH = 'action-fetch'
    static ACTION_HANDSHAKE = 'action-handshake'
    static ACTION_HOME = 'action-home'
    static ACTION_MARK = 'action-mark'
    static ACTION_NOTIFY = 'action-notify'
    static ACTION_REMAKE = 'action-remake'
    static ACTION_RATING = 'action-rating'
    static ACTION_REPORT = 'action-report'
    static ACTION_SHARE = 'action-share'
    static ACTION_SPECIFY = 'action-specify'
    static ACTION_SPLASH = 'action-splash'
    static ACTION_TRANSLATE = 'action-translate'

    static ACTION_LOGIN = 'action-login'
    static ACTION_LOGOUT = 'action-logout'
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
            [Trigger.ACTION_HOME]: home,
            [Trigger.ACTION_MARK]: mark,
            [Trigger.ACTION_NOTIFY]: notify,
            [Trigger.ACTION_RATING]: rating,
            [Trigger.ACTION_REMAKE]: remake,
            [Trigger.ACTION_REPORT]: report,
            [Trigger.ACTION_SHARE]: share,
            [Trigger.ACTION_SPLASH]: splash,
            [Trigger.ACTION_SPECIFY]: specify,
            [Trigger.ACTION_TRANSLATE]: translate,
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
                    return clone(await this.actions[name](this, ...params))
                } catch (exception) {
                    Revenue.pause()
                    Analytic.error(exception)
                    this.push(Trigger.ACTION_RELOAD, {
                        status: Trigger.STATUS_ERROR,
                    })
                }
            })()
        }
        return async () => {}
    }
}
