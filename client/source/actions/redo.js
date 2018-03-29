import Axios from 'axios'

import * as Constants from '~/constants'
import Trigger from './trigger'

export default trigger => {
    let state = trigger.state()
    return new Promise((resolve, reject) => {
        Axios.get(Constants.ACTION_REDO, {
            params: {
                token: state.token,
                identity: state.identity,
            },
        })
            .then(response => {
                let state = trigger.state()
                state.identity = response.data.identity
                state.task = response.data.task
                state.status = Constants.STATE_STATUS_ACTIVE
                state.option = null
                trigger.push(Trigger.ACTION_REDO, state)
                resolve()
            })
            .catch(exception => {
                console.log(exception)
                reject()
            })
    })
}
