import { isEmpty } from 'lodash'
import Store from 'store'
import ExpireStorePlugin from 'store/plugins/expire'

import { Crypto, Hash, Json } from './'

Store.addPlugin(ExpireStorePlugin)
export default class {
    static update(state) {
        state = Crypto.encrypt(Hash.sha3(APPLICATION_NAME), Json.encode(state))
        Store.set(STORE_STATE_KEY, state, Date.now() + STORE_STATE_EXPIRE)
    }

    static state() {
        let state = Store.get(STORE_STATE_KEY)
        if (!isEmpty(state)) {
            state = Crypto.decrypt(Hash.sha3(APPLICATION_NAME), state)
            return Json.decode(state)
        } else {
            return state
        }
    }
}
