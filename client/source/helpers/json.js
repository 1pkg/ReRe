export default class {
    static encode(data) {
        return JSON.stringify(data)
    }

    static decode(data) {
        return JSON.parse(data)
    }
}
