import * as CryptoJS from 'crypto-js'

export default class {
    encrypt(key, data) {
        let iv = CryptoJS.enc.Hex.parse(this.iv(key))
        key = CryptoJS.enc.Hex.parse(key)
        data = CryptoJS.AES.encrypt(data, key, { iv: iv })
        return CryptoJS.enc.Base64.stringify(data)
    }

    decrypt(key, data) {
        let iv = CryptoJS.enc.Hex.parse(this.iv(key))
        key = CryptoJS.enc.Hex.parse(key)
        data = CryptoJS.lib.CipherParams.create({
            ciphertext: CryptoJS.enc.Base64.parse(data),
        })
        data = CryptoJS.AES.decrypt(data, key, { iv: iv })
        return data.toString(CryptoJS.enc.Utf8)
    }

    iv(key, size = 32) {
        return key
            .split('')
            .reverse()
            .slice(0, size)
            .join('')
    }
}
