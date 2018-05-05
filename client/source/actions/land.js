import Axios from 'axios'
import Qs from 'qs'

import Trigger from './trigger'

export default async trigger => {
    let response = await Axios.post(
        'land',
        Qs.stringify({
            token: trigger.state().token,
        }),
    )
    let state = trigger.state()
    trigger.push(Trigger.ACTION_LAND, state)
    return state
}
