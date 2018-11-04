import { clone, isEmpty } from 'lodash'
import Store from 'store'
import ExpireStorePlugin from 'store/plugins/expire'

import Trigger from '~/actions/trigger'
import { Crypto, Hash, Json } from './'

Store.addPlugin(ExpireStorePlugin)
export default class self {
    static update(state) {
        let copy = clone(state)
        copy.blobs = {}
        copy = Crypto.encrypt(
            Hash.sha3(APPLICATION_FULL_NAME),
            Json.encode(copy),
        )
        Store.set(STORE_STATE_KEY, copy, Date.now() + STORE_STATE_EXPIRE)
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
}
