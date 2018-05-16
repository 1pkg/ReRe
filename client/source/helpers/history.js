import History from 'history/createBrowserHistory'

let history = History()
export default class {
    static push(label) {
        if (label) {
            history.push(`/rect/?l=${label}`, { label })
        } else {
            history.push(`/home`, {})
        }
    }

    static change(handler) {
        return history.listen((location, action) => {
            if (action !== 'POP') {
                return
            }

            if (location.state && 'label' in location.state) {
                handler(location.state.label)
            } else {
                handler(undefined)
            }
        })
    }
}
