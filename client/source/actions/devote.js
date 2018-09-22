import Trigger from './trigger'
import { Http } from '~/helpers'

export default async trigger => {
    let state = trigger.state()
    let token = state.token
    let data = await Http.process(Trigger.ACTION_DEVOTE, { token }, token)
    state.shaders = data.shaders
    state.settings = data.settings
    state.blobs = {}
    trigger.push(Trigger.ACTION_DEVOTE, state)
    return state
}
