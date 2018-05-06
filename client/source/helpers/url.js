import UrlParse from 'url-parse'

export default class {
    static current() {
        return window.location.href
    }

    static parse(url = null) {
        url = url ? url : window.location
        return UrlParse(url, true)
    }
}
