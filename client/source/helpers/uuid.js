import blake2b from 'blake2b'

export default class {
    static alias() {
        return 'Tommy Wiseau'
    }

    static generate() {
        let hash = blake2b(16)
        return hash.digest('hex')
    }
}
