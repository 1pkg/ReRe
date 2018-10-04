import { startCase } from 'lodash'
import * as CryptoJS from 'crypto-js'
import faker from 'faker'

import { Env, Http } from './'

export default class self {
    static alias() {
        return `${faker.name.prefix()} ${startCase(faker.random.words())}`
    }

    static async uuid(alias, socialid) {
        let digest = CryptoJS.SHA3(await self.digest(alias, socialid))
        return digest.toString()
    }

    static async digest(alias, socialid) {
        let lookup = Env.cordova() ? self.clookup() : await self.weblookup()
        lookup.unshift(alias)
        socialid ? lookup.unshift(socialid) : void 0
        return lookup.join('|')
    }

    static clookup() {
        return [device.platform, device.version, device.model, device.uuid]
    }

    static async weblookup() {
        if (Env.production()) {
            let lookup = await Http.read(`${SCHEMA}://${LOOK_UP_URL}`)
            return [
                lookup.geobytesipaddress,
                lookup.geobytescountry,
                lookup.geobytescity,
                lookup.geobyteslatitude,
                lookup.geobyteslongitude,
            ]
        } else {
            return []
        }
    }
}
