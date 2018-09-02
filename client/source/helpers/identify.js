import * as CryptoJS from 'crypto-js'

import { Env, Http } from './'

export default class self {
    static async uuid(alias) {
        let digest = CryptoJS.SHA3(await self.digest(alias))
        return digest.toString()
    }

    static async digest(alias) {
        let lookup = Env.cordova() ? self.clookup() : await self.weblookup()
        lookup.unshift(alias)
        return lookup.join('|')
    }

    static clookup() {
        return [device.platform, device.version, device.model, device.uuid]
    }

    static async weblookup() {
        let lookup = await Http.read(`${SCHEMA}://${LOOK_UP_URL}`)
        return [
            lookup.query,
            lookup.country,
            lookup.city,
            lookup.lat,
            lookup.lon,
        ]
    }
}
