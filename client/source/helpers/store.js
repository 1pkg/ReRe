import { clone, isEmpty } from 'lodash'
import Store from 'store'
import ExpireStorePlugin from 'store/plugins/expire'

import Trigger from '~/actions/trigger'
import { Crypto, Hash, Json } from './'

Store.addPlugin(ExpireStorePlugin)
export default class self {
    static update(state) {
        let clear = clone(state)
        clear.blobs = {}
        clear = Crypto.encrypt(
            Hash.sha3(APPLICATION_FULL_NAME),
            Json.encode(clear),
        )
        Store.set(STORE_STATE_KEY, clear, Date.now() + STORE_STATE_EXPIRE)
    }

    static state() {
        let state = Store.get(STORE_STATE_KEY)
        if (!isEmpty(state)) {
            state = Crypto.decrypt(Hash.sha3(APPLICATION_FULL_NAME), state)
            return Json.decode(state)
        } else {
            return state
        }
    }

    static async restore(trigger) {
        let subjects = []
        let state = self.state()
        if ('lists' in state && state.lists) {
            for (let list in state.lists) {
                for (let task of state.lists[list]) {
                    subjects.push(task.subject.link)
                }
            }
        }
        if ('task' in state && state.task) {
            subjects.push(state.task.subject.link)
        }
        return await trigger.call(Trigger.ACTION_TRANSLATE, subjects)
    }
}
