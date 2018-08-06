export default class self {
    static ENV_MODE_WEB = 'web'
    static ENV_MODE_CORDOVA = 'cordova'

    static ENV_PRODUCTION = 'production'
    static ENV_DEVELOPMENT = 'development'

    static web() {
        return ENV_MODE == self.ENV_MODE_WEB
    }

    static cordova() {
        return ENV_MODE == self.ENV_MODE_CORDOVA
    }

    static production() {
        return process.env.NODE_ENV == self.ENV_PRODUCTION
    }

    static development() {
        return process.env.NODE_ENV == self.ENV_DEVELOPMENT
    }
}
