import Axios from 'axios'

import * as Constants from '~/constants'
import Trigger from './trigger'

export default (trigger, option) => {
    let state = trigger.state()
    return new Promise((resolve, reject) => {
        Axios.get(Constants.ACTION_CHOOSE, {
            params: {
                token: state.token,
                identity: state.identity,
                option: option,
            },
        })
            .then(response => {
                let state = trigger.state()
                state.option = response.data.option
                state.status = response.data.result
                    ? Constants.STATE_STATUS_CORRECT
                    : Constants.STATE_STATUS_WRONG
                trigger.push(Trigger.ACTION_CHOOSE, state)
                resolve()
            })
            .catch(exception => {
                console.log(exception)
                reject()
            })
    })
}
