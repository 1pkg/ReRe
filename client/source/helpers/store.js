import Store from 'store'
import ExpireStorePlugin from 'store/plugins/expire'

const STORE_STATE_KEY = 'wit-store-state'
const STORE_STATE_EXPIRE = 18000

Store.addPlugin(ExpireStorePlugin)
export default class {
    static update(state) {
        Store.set(STORE_STATE_KEY, state, Date.now() + STORE_STATE_EXPIRE)
    }

    static state() {
        return Store.get(STORE_STATE_KEY)
    }
}
