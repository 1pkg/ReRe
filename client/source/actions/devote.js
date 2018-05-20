import Lodash from 'lodash'
import Axios from 'axios'

import Trigger from './trigger'

export default async trigger => {
    try {
        let state = trigger.state()
        let response = await Axios.post('devote', {
            token: state.token,
        })
        state.shaders = response.data.shaders
        state.settings = response.data.settings
        trigger.push(Trigger.ACTION_DEVOTE, state)
        return state
    } catch (exception) {
        trigger.push(Trigger.ACTION_RELOAD, { status: Trigger.STATUS_ERROR })
        throw exception
    }
}
