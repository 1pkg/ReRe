import UrlParse from 'url-parse'

import { Env } from './'

export default class {
    static current() {
        if (Env.web()) {
            return window.location.href
        }
        return `${SCHEMA}://${BASE_URL}`
    }

    static parse(url = null) {
        if (Env.web()) {
            url = url ? url : window.location
            return UrlParse(url, true)
        }
        return null
    }
}
