import Axios from 'axios'

import Trigger from './trigger'

export default (trigger, option) => {
    let state = trigger.state()
    return new Promise((resolve, reject) => {
        Axios.get(API.concat('choose'), {
            params: {
                token: state.token,
                identity: state.identity,
                option: option,
            },
        })
            .then(response => {
                let state = trigger.state()
                state.option = response.data.option
                state.timestamp = null
                state.status = response.data.result
                    ? Trigger.STATUS_CORRECT
                    : Trigger.STATUS_WRONG
                trigger.push(Trigger.ACTION_CHOOSE, state)
                resolve()
            })
            .catch(exception => {
                console.log(exception)
                reject()
            })
    })
}
