// @flow

import * as Redux from 'redux'
import Lodash from 'lodash'

import * as Model from './../model'

import Tick from './tick'
import Identify from './identify'
import Initialize from './initialize'
import Fetch from './fetch'
import Chose from './chose'
import Use from './use'

export default class Trigger {
    actions: {
        [string]: (trigger: Trigger, params: Array<any>) => void,
    }
    store: Redux.Store
    interval: number

    static get ACTION_TICK(): string {
        return 'action-tick'
    }

    static get ACTION_IDENTIFY(): string {
        return 'action-identify'
    }

    static get ACTION_INITIALIZE(): string {
        return 'action-initialize'
    }

    static get ACTION_FETCH(): string {
        return 'action-fetch'
    }

    static get ACTION_CHOSE(): string {
        return 'action-chose'
    }

    static get ACTION_USE(): string {
        return 'action-use'
    }

    constructor(store: Redux.Store): void {
        this.store = store
        this.actions = {
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

    call(name: string, ...params: Array<any>): void {
        if (name in this.actions) {
            this.actions[name](this, ...params)
        }
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
}
