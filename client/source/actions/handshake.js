import Axios from 'axios'

import * as Constants from '~/constants'
import Trigger from './trigger'

export default trigger => {
    return new Promise((resolve, reject) => {
        Axios.get(Constants.ACTION_HANDSHAKE, {
            params: {},
        })
            .then(response => {
                let state = response.data
                state.status = null
                trigger.push(Trigger.ACTION_HANDSHAKE, state)
                resolve()
            })
            .catch(exception => {
                console.log(exception)
                reject()
            })
    })
}
