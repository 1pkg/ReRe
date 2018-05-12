import History from 'history/createBrowserHistory'

let history = History()
export default class {
    static push(label) {
        history.push(`?label=${label}`, { label })
    }

    static change(handler) {
        return history.listen((location, action) => {
            if (
                action === 'POP' &&
                location.state &&
                'label' in location.state
            ) {
                handler(location.state.label)
            }
        })
    }
}
