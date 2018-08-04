export default class self {
    static ENV_MODE_WEB = 'web'
    static ENV_MODE_CORDOVA = 'cordova'

    static web() {
        return ENV_MODE == self.ENV_MODE_WEB
    }

    static cordova() {
        return ENV_MODE == self.ENV_MODE_CORDOVA
    }
}
