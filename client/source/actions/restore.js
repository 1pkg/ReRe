import * as Model from '~/model'
import * as Constants from '~/constants'
import Trigger from './trigger'

export default (trigger: Trigger, state: Model.State): Promise<any> => {
    return new Promise((resolve, reject) => {
        trigger.stop()
        trigger.push(Trigger.ACTION_RESTORE, state)
        if (!state.entry) {
            resolve()
        }

        switch (state.entry.status) {
            case Constants.STATUS_PROCESS:
                trigger.run(() => trigger.call(Trigger.ACTION_TICK))
                break

            case Constants.STATUS_PREVIEW:
                trigger.call(Trigger.ACTION_FETCH)
                break

            default:
                resolve()
        }
        resolve()
    })
}
