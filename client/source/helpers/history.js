import History from 'history/createBrowserHistory'

export default class self {
    static history = History()

    static push(label) {
        if (label) {
            self.history.push(`/rect/?l=${label}`, { label })
        } else {
            self.history.push(`/home`, {})
        }
    }

    static change(handler) {
        return self.history.listen((location, action) => {
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
