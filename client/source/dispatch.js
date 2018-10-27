import { History, Store, Url } from './helpers'
import Trigger from './actions/trigger'

export default async trigger => {
    let state = Store.state()
    if (state == null || !('token' in state)) {
        trigger.push(Trigger.ACTION_LOGIN, {
            status: Trigger.STATUS_LOGIN,
        })
        return
    }

    if (!('settings' in state || 'shaders' in state)) {
        state = await trigger.call(Trigger.ACTION_DEVOTE)
    }
    if (!('stats' in state)) {
        state = await trigger.call(Trigger.ACTION_SPECIFY)
    }

    let purl = Url.parse()
    if (
        state.status === Trigger.STATUS_ACTIVE ||
        state.status === Trigger.STATUS_CORRECT ||
        state.status === Trigger.STATUS_WRONG
    ) {
        trigger.push(Trigger.ACTION_STORE, state)
        History.push(state.task.label)
        await trigger.call(Trigger.ACTION_TRANSLATE, [state.task.subject.link])
    } else if (state.status === Trigger.STATUS_HOME) {
        trigger.push(Trigger.ACTION_STORE, state)
        History.push(state.status)
        let subjects = []
        for (let list in state.lists) {
            for (let task of state.lists[list]) {
                subjects.push(task.subject.link)
            }
        }
        await trigger.call(Trigger.ACTION_TRANSLATE, subjects)
    } else if (state.status === Trigger.STATUS_RATING) {
        trigger.push(Trigger.ACTION_STORE, state)
        History.push(state.status)
    } else if (purl && purl.query && 'l' in purl.query) {
        await trigger.call(Trigger.ACTION_FETCH, purl.query.l)
    } else if (purl && purl.pathname) {
        if (purl.pathname == History.ROUTE_HOME) {
            await trigger.call(Trigger.ACTION_HOME)
        } else if (purl.pathname == History.ROUTE_RATING) {
            await trigger.call(Trigger.ACTION_RATING)
        } else {
            await trigger.call(Trigger.ACTION_SPLASH)
        }
    } else {
        await trigger.call(Trigger.ACTION_SPLASH)
    }
}
