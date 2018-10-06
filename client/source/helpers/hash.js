import * as CryptoJS from 'crypto-js'

export default class {
    static sha3(data) {
        return CryptoJS.SHA3(data).toString()
    }
}
