import Trigger from './trigger'
import { Http } from '~/helpers'

export default async trigger => {
    let state = trigger.state()
    let token = state.token
    state.notifications = await Http.process(
        Trigger.ACTION_NOTIFY,
        { token },
        token,
    )
    trigger.push(Trigger.ACTION_NOTIFY, state)
    return state
}
