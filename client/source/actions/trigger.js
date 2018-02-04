// @flow

import Lodash from 'lodash'
import * as Redux from 'redux'

import * as Model from '~/model'
import Restore from './restore'
import Tick from './tick'
import Identify from './identify'
import Initialize from './initialize'
import Fetch from './fetch'
import Chose from './chose'
import Use from './use'

export default class Trigger {
    static +ACTION_RESTORE = 'action-restore'
    static +ACTION_TICK = 'action-tick'
    static +ACTION_IDENTIFY = 'action-identify'
    static +ACTION_INITIALIZE = 'action-initialize'
    static +ACTION_FETCH = 'action-fetch'
    static +ACTION_CHOSE = 'action-chose'
    static +ACTION_USE = 'action-use'

    actions: {
        [string]: (trigger: Trigger, params: Array<any>) => Promise<any>,
    }
    store: Redux.Store
    interval: number

    constructor(store: Redux.Store): void {
        this.store = store
        this.actions = {
            [Trigger.ACTION_RESTORE]: Restore,
            [Trigger.ACTION_TICK]: Tick,
            [Trigger.ACTION_IDENTIFY]: Identify,
            [Trigger.ACTION_INITIALIZE]: Initialize,
            [Trigger.ACTION_FETCH]: Fetch,
            [Trigger.ACTION_CHOSE]: Chose,
            [Trigger.ACTION_USE]: Use,
        }
    }

    state(): Model.State {
        return Lodash.clone(this.store.getState())
    }

    call(name: string, ...params: Array<any>): Promise<any> {
        if (name in this.actions) {
            return this.actions[name](this, ...params)
        }
        return new Promise((resolve, reject) => reject())
    }

    push(name: string, state: Model.State): void {
        this.store.dispatch({
            type: name,
            state,
        })
    }

    timestamp(): number {
        return Math.floor(new Date().getTime() / 1000)
    }

    run(task: () => void): void {
        setInterval(task, 1000)
    }

    stop(): void {
        clearInterval(this.interval)
    }

    archivate(label: string): void {
        if (history) {
            history.pushState({}, '', '/?task=' + label)
        }
    }
}
