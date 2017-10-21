// @flow

import Store from 'store'
import ExpireStorePlugin from 'store/plugins/expire'
import UrlParse from 'url-parse'

import * as Model from './model'
import Trigger from './actions/trigger'
import * as Constants from './constants'

Store.addPlugin(ExpireStorePlugin)
export default class Dispathcer {
    static resolve(trigger: Trigger) {
        let state = Store.get('wit')
        let url = UrlParse(window.location, true)

        if (state) {
            trigger.call(Trigger.ACTION_RESTORE, state)
        } else if (url.query && 'task' in url.query) {
            trigger.call(Trigger.ACTION_IDENTIFY).then(() => {
                trigger.call(Trigger.ACTION_INITIALIZE, url.query.task)
            })
        } else {
            trigger.call(Trigger.ACTION_IDENTIFY)
        }
    }
}
