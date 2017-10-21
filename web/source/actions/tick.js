import * as Model from './../model'
import Trigger from './trigger'
import * as Constants from './../constants'

export default (trigger: Trigger, interval: number): Promise<any> => {
    return new Promise((resolve, reject) => {
        let state: Model.State = trigger.state()
        if (isNaN(state.entry.timestamp)) {
            trigger.stop()
            resolve()
        }
        if (
            trigger.timestamp() - state.entry.timestamp >=
            state.settings[Constants.SETTING_TIMESTAMP_DURATION]
        ) {
            trigger.call(Trigger.ACTION_CHOSE, -1)
            state.entry.timestamp = NaN
        }
        trigger.push(Trigger.ACTION_TICK, state)
        resolve()
    })
}
