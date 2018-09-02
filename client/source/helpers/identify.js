import { startCase } from 'lodash'
import blake2b from 'blake2b'
import faker from 'faker'

import { Env, Http } from './'

export default class self {
    static alias() {
        return `${faker.name.prefix()} ${startCase(faker.random.words())}`
    }

    static async uuid() {
        let lookup = Env.cordova() ? self.clookup() : await self.weblookup()
        let hash = blake2b(16)
        for (let piece of lookup) {
            hash.update(piece)
        }
        return hash.digest('hex')
    }

    static async digest() {
        let lookup = Env.cordova() ? self.clookup() : await self.weblookup()
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
