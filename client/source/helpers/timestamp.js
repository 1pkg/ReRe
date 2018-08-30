export default class {
    static current() {
        return Math.floor(Date.now() / 1000)
    }

    static year() {
        return new Date().getFullYear()
    }
}
