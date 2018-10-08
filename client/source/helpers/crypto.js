import * as CryptoJS from 'crypto-js'

const KEY_SIZE = 32

let _iv = key => {
    return key
        .split('')
        .reverse()
        .slice(0, KEY_SIZE)
        .join('')
}

let _merge = (key, size = 4) => {
    let chunks = []
    for (let i = 0; i < key.length; i += size) {
        chunks.push(parseInt(`0x${key.slice(i, i + size)}`, 16))
    }
    while (chunks.length > KEY_SIZE / size) {
        for (let i = 0; i < chunks.length / 2; ++i) {
            chunks[i] = chunks[i * 2] ^ chunks[i * 2 + 1]
        }
        chunks = chunks.slice(0, chunks.length / 2)
    }
    return chunks
        .map(chunk => chunk.toString(16))
        .join('')
        .slice(0, 32)
        .padEnd(KEY_SIZE, 'f')
}

export default class {
    static encrypt(key, data) {
        key = _merge(key)
        let iv = CryptoJS.enc.Hex.parse(_iv(key))
        key = CryptoJS.enc.Hex.parse(key)
        data = CryptoJS.AES.encrypt(data, key, { iv: iv })
        return data.toString()
    }

    static decrypt(key, data) {
        key = _merge(key)
        let iv = CryptoJS.enc.Hex.parse(_iv(key))
        key = CryptoJS.enc.Hex.parse(key)
        data = CryptoJS.lib.CipherParams.create({
            ciphertext: CryptoJS.enc.Base64.parse(data),
        })
        data = CryptoJS.AES.decrypt(data, key, { iv: iv })
        return data.toString(CryptoJS.enc.Utf8)
    }
}
